import { toast } from "sonner";

export class useLogin {
  static async login(data: { email: string; senha: string }) {
    try {
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
      toast.success("Login feito com sucesso!");

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      toast.error("Credenciais inválidas");
    }
  }
}
