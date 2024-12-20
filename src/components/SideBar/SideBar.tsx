"use client";
import Image from "next/image";
import logo from "@/assets/logo.png";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  ScrollText,
} from "lucide-react";
import { redirect } from "@/utils/redirect";
import { logout } from "@/utils/logout";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SideBar() {
  const [isExiting, setIsExiting] = useState(false); // Controla o estado da animação de saída
  const [redirectPath, setRedirectPath] = useState(""); // Armazena a rota de redirecionamento

  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const handleRedirect = (href: string) => {
    setRedirectPath(href);
    setIsExiting(true);

    setTimeout(() => {
      redirect(href);
    }, 100);
  };

  return (
    <>
      <motion.aside
        initial="hidden"
        animate={isExiting ? "exit" : "visible"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 70, damping: 20 }}
        className="w-72 h-screen bg-green flex flex-col items-center fixed"
      >
        <figure className="w-12/12 h-1/6 flex justify-start items-center">
          <Image
            src={logo}
            alt="Electric Power"
            width={100}
            height={100}
            className=""
          />
        </figure>

        <ul className="w-full flex flex-col gap-1">
          {pages.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleRedirect(item.href)} // Chama a função de redirecionamento
              className="w-full h-12 hover:bg-white/20 duration-250 cursor-pointer flex gap-2 items-center px-6 hover:scale-105"
            >
              {item.icon}
              <p className="text-white">{item.title}</p>
            </li>
          ))}
        </ul>

        <button
          className="w-full h-12 hover:bg-white/20 duration-250 cursor-pointer flex gap-2 items-center px-6 absolute bottom-0"
          onClick={logout}
        >
          <LogOut className="text-white" />
          <p className="text-white">Logout</p>
        </button>
      </motion.aside>
      <aside className="w-72 h-screen bg-white flex flex-col items-center" />
    </>
  );
}

const pages = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="text-white" />,
  },
  {
    title: "Homologações",
    href: "/homologacoes",
    icon: <ScrollText className="text-white" />,
  },
  {
    title: "Projetos",
    href: "/projetos",
    icon: <ClipboardList className="text-white" />,
  },
];
