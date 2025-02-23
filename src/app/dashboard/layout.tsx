import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard is a tool that helps you to automate your work.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-foreground/5">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
