import "./globals.css";

export const metadata = {
  title: "UltraLab | Digital Health Portal",
  description: "Secure cloud-based medical report management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Remove any fixed heights here so the page can scroll */}
      <body className="antialiased bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}