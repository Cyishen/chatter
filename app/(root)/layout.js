import { Inter } from "next/font/google";
import "../globals.css";
import TopBar from "@components/TopBar";
import Provider from "@components/auth/Provider";
import BottomBar from "@components/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatter",
  description: "Chatterbox",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-2`}>
        <Provider >
          <TopBar />
          {children}
          <BottomBar />
        </Provider>
      </body>
    </html>
  );
}
