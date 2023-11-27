import "./globals.css";

import UserProvider from "./context/user";
import CartProvider from "./context/cart";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "Ecommerce Website",
};

export const dynamic = "force-dynamic";
//export const dynamicParams = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
