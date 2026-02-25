import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-responsive-modal/styles.css";
import { WagmiProvider } from "./providers";

const rubik = localFont({
  src: "./fonts/Rubik-VF.ttf",
  variable: "--font-Rubik",
});

export const metadata: Metadata = {
  title: "Jungle Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body data-vaul-drawer-wrapper className={`${rubik.variable}`}>
        <WagmiProvider>{children}</WagmiProvider>
      </body>
    </html>
  );
}
