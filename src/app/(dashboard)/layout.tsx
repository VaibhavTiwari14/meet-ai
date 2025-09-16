import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";

/**
 * Root layout for the dashboard area.
 *
 * Wraps content with sidebar context and renders the sidebar, a top navbar, and the provided children
 * inside a full-screen main content region.
 *
 * @param children - Content displayed below the dashboard navbar inside the main area.
 * @returns A JSX element containing the dashboard layout.
 */
function dashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="dlex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default dashboardLayout;
