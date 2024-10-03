"use client";
import SideBar from "@/components/SideBar/SideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Login from "../page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const access_ep = localStorage.getItem("access_ep");

      if (!access_ep) {
        router.push("/");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  if (isAuthenticated === null || !isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <SideBar />
      {children}
    </>
  );
}
