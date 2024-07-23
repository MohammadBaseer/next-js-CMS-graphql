import Sidebar from "@/Component/Navbar/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <h1>Hello</h1>
      {children}
    </div>
  );
}
