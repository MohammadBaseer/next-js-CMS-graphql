import Navbar from "@/Component/Navbar/Navbar";
import Sidebar from "@/Component/Sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <Navbar />
      {children}
    </div>
  );
}
