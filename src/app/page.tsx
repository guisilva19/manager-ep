import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button, Input } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="bg-green w-screen h-screen flex flex-col items-center justify-center gap-14">
      <figure className="">
        <Image src={logo} alt="LOGO" width={150} height={150} />
      </figure>
      <form className="w-96 h-96 flex flex-col items-center gap-4">
        <Input variant="flat" label="E-mail" className="w-[320px]" />
        <Input variant="flat" label="Senha" className="w-[320px]" />
        <Button className="bg-yellow font-semibold text-white w-32">Entrar</Button>
      </form>
    </main>
  );
}
