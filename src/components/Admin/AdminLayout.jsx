import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import TopBar from "./TopBar";

const AdminLayout = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Sidebar: fixed on desktop, drawer on mobile (self-managed) */}
    <AdminSidebar />

    {/* Main content: pushed right of sidebar on desktop */}
    <div className="md:ml-64 flex flex-col min-h-screen">
      {/* TopBar: hidden on mobile (sidebar has its own topbar), sticky on desktop */}
      <div className="sticky top-0 z-20">
        <TopBar />
      </div>

      {/* pt-14 offsets the mobile sidebar topbar (h-14 = 56px), none needed on desktop */}
      <main className="flex-1 pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;
