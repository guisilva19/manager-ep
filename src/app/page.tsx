"use client";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "@/utils/schema";
import { useLogin } from "@/hook/useLogin";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  return (
    <main className="bg-green w-screen h-screen flex flex-col items-center justify-center gap-14">
      <figure className="">
        <Image src={logo} alt="LOGO" width={150} height={150} />
      </figure>
      <form
        onSubmit={handleSubmit((data) => {
          useLogin.login(data, router);
        })}
        className="w-96 h-96 flex flex-col items-center gap-4"
      >
        <Input
          variant="flat"
          label="E-mail"
          className="w-[320px]"
          {...register("email")}
        />
        <Input
          variant="flat"
          label="Senha"
          type="password"
          className="w-[320px]"
          {...register("senha")}
        />
        <Button
          type="submit"
          // onClick={() => router.push("/dashboard")}
          className="bg-yellow font-semibold text-white w-32"
        >
          Entrar
        </Button>
      </form>
    </main>
  );
}
