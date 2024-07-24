import Navbar from "@/Component/Navbar/Navbar";
import Sidebar from "@/Component/Sidebar/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <Navbar />
      {children}
    </div>
  );
}
