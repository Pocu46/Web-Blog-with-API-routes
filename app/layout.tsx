import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Header from "@/components/Header";
import Provider from "@/components/Provider";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Web Blog App",
  description: "Create some articles to save them",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true} >
        <Provider>
          <Header/>
            <div className="m-auto w-full lg:w-[960px]">
              {children}
            </div>
          <div id="modalId"/>
        </Provider>
      </body>
    </html>
  );
}
