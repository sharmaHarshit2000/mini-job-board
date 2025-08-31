import "./globals.css";
import Header from "./components/Header";
import { AdminProvider } from "./context/AdminProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Mini Job Board</title>
      </head>
      <body className="bg-background text-foreground min-h-screen">
        <AdminProvider>
          <Header />
          <main className="p-6">{children}</main>
          <Toaster position="top-right" reverseOrder={false} />
        </AdminProvider>
      </body>
    </html>
  );
}
