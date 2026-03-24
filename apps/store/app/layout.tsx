import type { Metadata } from "next";
import localFont from "next/font/local";
import "@repo/ui/styles/global.css";
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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=close"
        />
      </head>
      <body data-vaul-drawer-wrapper className={`${rubik.variable}`}>
        <WagmiProvider>{children}</WagmiProvider>
      </body>
    </html>
  );
}
