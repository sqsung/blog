import "./globals.css";
import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import {
  Header,
  Footer,
  PageWrapper,
  HeaderPlaceholder,
} from "@/components/common";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--source-code-pro",
});

export const metadata: Metadata = {
  title: "JSJS Blog",
  description: "Frontend engineer's journey to becoming a better developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
              });
          `}
        </Script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.css"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} ${sourceCodePro.variable}`}>
        <PageWrapper>
          <Header />
          <HeaderPlaceholder />
          {children}
          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}
