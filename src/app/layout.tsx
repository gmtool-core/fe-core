import "@/app/globals.css";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import NextAuthWrapper from "@/library/next.auth.wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GM Tool",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <NextAuthWrapper>{children}</NextAuthWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
