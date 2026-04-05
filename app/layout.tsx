import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "M. Wahaj Naveed | Software Engineer & Full-Stack Developer",
    template: "%s | M. Wahaj Naveed",
  },
  description:
    "Portfolio of M. Wahaj Naveed — Software Engineering student, Full-Stack Developer, and ML enthusiast. Based in Pakistan.",
  keywords: [
    "Wahaj Naveed",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Pakistan",
  ],
  authors: [{ name: "M. Wahaj Naveed" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://wahajnaveed.vercel.app",
    siteName: "M. Wahaj Naveed",
    title: "M. Wahaj Naveed | Software Engineer & Full-Stack Developer",
    description:
      "Portfolio of M. Wahaj Naveed — Software Engineering student, Full-Stack Developer, and ML enthusiast.",
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Wahaj Naveed | Software Engineer",
    description:
      "Full-Stack Developer & ML Enthusiast. Building production-grade web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--bg-700)",
              color: "var(--text-100)",
              borderRadius: "12px",
              border: "1px solid var(--border-warm)",
              boxShadow: "var(--shadow-md)",
            },
          }}
        />
      </body>
    </html>
  );
}
