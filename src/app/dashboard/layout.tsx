import { Metadata } from "next";
import { Header } from "@/components/dashboard/Header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard is a tool that helps you to automate your work.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
