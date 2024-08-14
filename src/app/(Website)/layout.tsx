import WebNavbar from "@/Component/WebNavbar/WebNavbar";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <WebNavbar />
      {children}
    </div>
  );
}
