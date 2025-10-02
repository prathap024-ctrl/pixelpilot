import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import InnerLayout from "@/components/layout";

const exo = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "PixelPilot",
  description: "PixelPilot AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${exo.className} antialiased`}
      >
        <InnerLayout>{children}</InnerLayout>
      </body>
    </html>
  );
}
