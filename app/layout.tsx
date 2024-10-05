import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import Providers from "@/components/Providers";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Web Blog App",
  description: "Create some articles to save them",
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true} >
        <Providers>
          {session?.user && <Header/>}
            <div className="m-auto w-full lg:w-[960px]">
              {children}
            </div>
          <div id="modalId"/>
        </Providers>
      </body>
    </html>
  );
}
