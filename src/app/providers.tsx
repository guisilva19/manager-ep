import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
// import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Toaster position="top-right" richColors    /> */}
      <Toaster />
      <NextUIProvider>{children}</NextUIProvider>
    </>
  );
}
