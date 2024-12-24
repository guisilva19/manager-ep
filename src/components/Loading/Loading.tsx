import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <main className="w-screen h-screen flex items-center justify-center">
        <Spinner color="warning" label="Carregando..." />
      </main>
    </>
  );
}
