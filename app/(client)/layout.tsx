import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FBF9F5] min-h-screen flex flex-col">
      <Navbar />
      {/* flex-1 ensures the main content pushes the footer to the very bottom */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}