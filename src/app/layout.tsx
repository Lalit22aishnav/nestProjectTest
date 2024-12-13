import type { Metadata } from "next";

import '../styles/globals.css';

import Header from '../componets/header'
import Footer from '../componets/footer'
import SessionWrapper from "./session";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Header />
          <section className="mainbody">
            {children}
          </section>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
