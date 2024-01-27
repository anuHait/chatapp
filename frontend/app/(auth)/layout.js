import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "@components/ToasterContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-300">
       

      {children}
     
      </body>
    </html>
  );
}
