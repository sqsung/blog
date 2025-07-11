import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/lib/ThemeProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sqsung",
  description: "Things I've learned here and there",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${sourceCodePro.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col items-center">
            <div className="flex w-full max-w-[1000px] flex-1 flex-col gap-10 px-5 lg:px-0">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
