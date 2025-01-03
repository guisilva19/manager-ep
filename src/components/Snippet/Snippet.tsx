import { ClipboardCopy, Share2 } from "lucide-react";
import React, { useState } from "react";

const Snippet: React.FC<{ content: string }> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reseta estado após 3 segundos
    });
  };

  const handleShareWhatsApp = () => {
    const message = `
    Olá! 👋
  
    Para continuar com o processo de homologação com a Electric Power, solicitamos que efetue o pagamento utilizando o link abaixo: 
  
    🔗 ${content}
  
    Caso já tenha efetuado o pagamento, desconsidere esta mensagem. 
  
    Agradecemos pela sua colaboração! 😊
    `;
    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex items-center gap-2 p-2 border rounded bg-gray-100 w-72">
      <span className="flex-1 text-gray-800 truncate">{content}</span>
      <button
        onClick={handleCopy}
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
        title="Copiar para área de transferência"
      >
        <ClipboardCopy className="h-5 w-5" />
      </button>
      <button
        onClick={handleShareWhatsApp}
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
        title="Compartilhar no WhatsApp"
      >
        <Share2 className="h-5 w-5" />
      </button>
      {copied && <span className="text-sm text-green-600">Copiado!</span>}
    </div>
  );
};

export default Snippet;
