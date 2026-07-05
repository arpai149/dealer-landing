#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2];
const outputPath = process.argv[3] || "data/parsed-inventory.json";

if (!inputPath) {
  console.error("Usage: node scripts/parse-dbs-inventory.mjs <report.txt> [output.json]");
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, "utf8");

const MODEL_HEADERS = new Set([
  "ALTIMA",
  "ARMADA",
  "LEAF",
  "MURANO",
  "NEW KICKS",
  "PATHFINDER",
  "ROGUE",
  "ROGUE PHEV",
  "SENTRA",
  "VERSA SEDAN",
  "FRONTIER",
]);

const COLOR_MAP = {
  KAD: "Gun Metallic",
  KH3: "Super Black",
  QAC: "Glacier White Pearl",
  QBE: "Pearl White TriCoat",
  QM1: "Fresh Powder",
  NBL: "Deep Ocean Blue Pearl",
  RCJ: "Scarlet Ember Tintcoat",
  RAY: "Blue Pearl",
  XAB: "Two-Tone Black/White",
  XGZ: "Two-Tone Gray",
  XHQ: "Two-Tone Copper/Black",
  XKJ: "Two-Tone Gray/Black",
  XKN: "Two-Tone Blue/Black",
  FAN: "Everest White Pearl",
  CBF: "Gray Sky Pearl",
  CBH: "Atlantic Gray Metallic",
  KBY: "Boulder Gray Pearl",
  KBZ: "Electric Blue Metallic",
  QAK: "Glacier White",
  A20: "Red Alert",
  DAQ: "Baja Storm",
  DAN: "Baja Storm",
  GAS: "Gray",
};

function normalizeModel(line) {
  return line.trim().replace(/\s+/g, " ").toUpperCase();
}

function categoryFromDays(days) {
  if (days >= 90) return "aged";
  if (days >= 40) return "aging";
  if (days >= 10) return "active";
  return "fresh";
}

function urgencyFromDays(days) {
  if (days >= 90) return "Manager special - must go";
  if (days >= 40) return "Priced to move";
  if (days >= 10) return "High-demand unit";
  return "Just arrived";
}

function parseVehicleLine(line, model) {
  const match = line.match(/^\s*(\d{5})\s+([A-HJ-NPR-Z0-9]{11})\s+(\d{6})\s+([A-Z0-9]{3})\s+([A-Z])\s+(.*)$/);
  if (!match) return null;

  const [, modelCode, vinPrefix, serial, colorCode, fd, restRaw] = match;
  const tokens = restRaw.trim().split(/\s+/).filter(Boolean);

  // Locate billed dealer token from the right. Dates are 6 digits; days are <=3 digits; dealer is usually 4-5 digits.
  let dealerIndex = -1;
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (/^\d{4,5}$/.test(tokens[i])) {
      dealerIndex = i;
      break;
    }
  }

  const optionCodes = dealerIndex >= 0 ? tokens.slice(0, dealerIndex) : tokens;
  const trailing = dealerIndex >= 0 ? tokens.slice(dealerIndex) : [];
  const billedToDealer = trailing[0] || "";

  let draftDate = "";
  let daysInStock = 0;
  let transferDays = null;
  let transferDate = "";

  const afterDealer = trailing.slice(1);
  if (afterDealer[0] && /^\d{6}$/.test(afterDealer[0])) {
    draftDate = afterDealer[0];
    if (afterDealer[1] && /^\d+$/.test(afterDealer[1])) daysInStock = Number(afterDealer[1]);
    if (afterDealer[2] && /^\d+$/.test(afterDealer[2])) transferDays = Number(afterDealer[2]);
    if (afterDealer[3] && /^\d{6}$/.test(afterDealer[3])) transferDate = afterDealer[3];
  } else if (afterDealer[0] && /^\d+$/.test(afterDealer[0])) {
    daysInStock = Number(afterDealer[0]);
    if (afterDealer[1] && /^\d{6}$/.test(afterDealer[1])) transferDate = afterDealer[1];
  }

  const vin = `${vinPrefix}${serial}`;

  return {
    vin,
    model,
    modelCode,
    serial,
    colorCode,
    colorName: COLOR_MAP[colorCode] || colorCode,
    fd,
    optionCodes,
    billedToDealer,
    draftDate,
    daysInStock,
    transferDays,
    transferDate,
    category: categoryFromDays(daysInStock),
    urgency: urgencyFromDays(daysInStock),
    slug: `${model.toLowerCase().replace(/\s+/g, "-")}-${vin.slice(-6)}`,
  };
}

function parseReport(text) {
  const lines = text.split(/\r?\n/);
  let currentModel = "";
  const vehicles = [];
  const totals = {};

  for (const line of lines) {
    const clean = normalizeModel(line);

    if (MODEL_HEADERS.has(clean)) {
      currentModel = clean;
      continue;
    }

    const totalMatch = clean.match(/^(.+?)\s+TOTAL\s+(\d+)$/);
    if (totalMatch) {
      totals[totalMatch[1].trim()] = Number(totalMatch[2]);
      continue;
    }

    if (!currentModel) continue;

    const vehicle = parseVehicleLine(line, currentModel);
    if (vehicle) vehicles.push(vehicle);
  }

  const byModel = vehicles.reduce((acc, v) => {
    acc[v.model] ||= { count: 0, fresh: 0, active: 0, aging: 0, aged: 0, maxDays: 0 };
    acc[v.model].count += 1;
    acc[v.model][v.category] += 1;
    acc[v.model].maxDays = Math.max(acc[v.model].maxDays, v.daysInStock);
    return acc;
  }, {});

  return {
    source: "Nissan DBS WDN0962-R1 Daily Inventory Report",
    parsedAt: new Date().toISOString(),
    vehicleCount: vehicles.length,
    reportedTotals: totals,
    byModel,
    vehicles,
  };
}

const parsed = parseReport(raw);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2));
console.log(`Parsed ${parsed.vehicleCount} vehicles -> ${outputPath}`);
console.log(parsed.byModel);
