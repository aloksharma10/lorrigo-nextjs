// import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Authentication | Lorrigo Portal",
  description: "We provide Lorrigo portal for BCIIT",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navbar /> */}
      <div className="container justify-between items-center lg:flex lg:my-5 lg:min-h-screen pt-28 lg:pt-0">{children}</div>
    </>
  );
}
