import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";

function dashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <DashboardSidebar/>
      <main className="dlex flex-col h-screen w-screen bg-muted">
        {children}
      </main>
    </SidebarProvider>
  );
}

export default dashboardLayout;
