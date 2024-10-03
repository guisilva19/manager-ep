import Image from "next/image";
import logo from "@/assets/logo.png";
import { LayoutDashboard } from "lucide-react";

export default function SideBar() {
  return (
    <>
      <aside className="w-72 h-screen bg-green flex flex-col items-center">
        <figure className="w-10/12 h-1/6 flex justify-start items-center">
          <Image src={logo} alt="Electric Power" width={100} height={100} />
        </figure>

        <ul></ul>
      </aside>
    </>
  );
}

const pages = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Homologação",
    href: "/homologação",
    icon: LayoutDashboard,
  },
  {
    title: "Projetos",
    href: "/projetos",
    icon: LayoutDashboard,
  },
  {
    title: "Projetos",
    href: "/projetos",
    icon: LayoutDashboard,
  },
];
