import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header"
import SlideComponent from './components/sliderComponent'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moviflixx",
  description: "Best movie downloading website",
  icons:{
    icon: ['/favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['/apple-touch-icon.png?v=4'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <SlideComponent/>
        {children}

      </body>
    </html>
  );
}
