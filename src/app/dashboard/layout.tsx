import type { Metadata } from "next";
import Header from "@/components/dashboard/Header";
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
    <div className="min-h-screen">
      <div className="p-3">
        <Header />
      </div>
      <div>{children}</div>
    </div>
  );
}
