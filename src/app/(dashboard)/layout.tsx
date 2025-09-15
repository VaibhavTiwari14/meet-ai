import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";

function dashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <DashboardSidebar/>
      <main className="dlex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar/>
        {children}
      </main>
    </SidebarProvider>
  );
}

export default dashboardLayout;
