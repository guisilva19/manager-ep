import toast from "react-hot-toast";

export class useLogin {
  static async login(data: { email: string; senha: string }, navigate: any) {
    try {
      await toast.promise(
        (async () => {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error("Credenciais inválidas");
          }

          const result = await response.json();
          localStorage.setItem("access_ep", result.token);
          return result;
        })(),
        {
          loading: "Carregando...",
          success: "Login feito com sucesso!",
          error: "Credenciais inválidas",
        }
      );

      navigate.push("/dashboard"); // Navega sem recarregar a página
    } catch (error) {
      console.error("Erro durante o login:", error); // Loga o erro no console
    }
  }
}
