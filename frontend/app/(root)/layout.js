import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";
import TopBar from "@components/TopBar";
const inter = Inter({ subsets: ["latin"] });
import ToasterContext from "@components/ToasterContext";
export const metadata = {
  title: "Chat app",
  description: "Chat app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Provider>
        <ToasterContext />
        <TopBar />
      {children}
    </Provider>
      </body>
    </html>
  );
}
