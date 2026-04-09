import "./globals.css";

export const metadata = {
  title: "Dealer Landing | O'Neil Nissan",
  description: "Fast dealership landing pages (Next.js).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
