import { Sidebar } from "@/app/components/Sidebar";
import { TopNavbar } from "@/app/components/TopNavbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNavbar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
