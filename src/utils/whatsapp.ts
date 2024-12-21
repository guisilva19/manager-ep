import toast from "react-hot-toast";

export function openWhatsApp(phoneNumber: string) {
  if (!phoneNumber) {
    console.error("Número de telefone não fornecido.");
    return;
  }

  // Formata o número removendo espaços e caracteres especiais
  const formattedNumber = phoneNumber.replace(/\D/g, "");

  if (formattedNumber.length < 10 || formattedNumber.length > 15) {
    toast.error("Não foi possivel redirecionar para WhatsApp!");
    return;
  }

  const whatsappUrl = `https://wa.me/${formattedNumber}`;

  window.open(whatsappUrl, "_blank");
}
