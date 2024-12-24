import { Spinner } from "@nextui-org/react";

export default function LoadingPartial() {
  return (
    <>
      <main className="w-full min-h-96 h-full flex items-center justify-center">
        <Spinner
          color="primary"
          // label="Buscando mais informações..."
        />
      </main>
    </>
  );
}
