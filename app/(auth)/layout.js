import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/auth/Provider";
import Footer from "@components/Footer";
import ToasterContext from "@components/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatter",
  description: "Chatterbox",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} mt-8 h-[100vh]`}>
        <Provider >
          <ToasterContext />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
