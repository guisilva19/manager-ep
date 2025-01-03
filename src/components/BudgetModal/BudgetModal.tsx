import React, { useState, useEffect } from "react";
import { Budget } from "../BudgetTable/BudgetTable";
import { Switch } from "@nextui-org/react";
import { CheckCheck } from "lucide-react";
import dayjs from "dayjs";

const BudgetModal = ({
  budget,
  isOpen,
  onClose,
  onUpdateStatus,
}: {
  budget: Budget | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (newStatus: boolean) => void;
}) => {
  const [status, setStatus] = useState(budget?.status);

  useEffect(() => {
    setStatus(budget?.status);
  }, [budget]);

  const handleToggle = () => {
    const newStatus = !status;
    setStatus(newStatus);
    onUpdateStatus(newStatus);
  };

  const formatDate = (date: string | undefined) =>
    date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "-";

  const handleWhatsAppRedirect = () => {
    const phoneNumber = budget?.telefone?.replace(/\D/g, "");
    const message = `Olá ${
      budget?.nome || ""
    }, estamos entrando em contato referente ao seu orçamento em ${formatDate(
      budget?.criado_em
    )}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Detalhes do Orçamento
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold">Nome:</span> {budget?.nome || "-"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {budget?.email || "-"}
          </p>
          <p>
            <span className="font-semibold">Cidade:</span>{" "}
            {budget?.cidade || "-"}
          </p>
          <p>
            <span className="font-semibold">Telefone:</span>{" "}
            {budget?.telefone || "-"}
          </p>
          <p>
            <span className="font-semibold">Endereço:</span>{" "}
            {budget?.endereco || "-"}
          </p>
          <p>
            <span className="font-semibold">Local:</span> {budget?.local || "-"}
          </p>
          <p>
            <span className="font-semibold">Valor da Conta de Luz:</span>{" "}
            {budget?.valor_da_conta_de_luz || "-"}
          </p>
          <p>
            <span className="font-semibold">Criado em:</span>{" "}
            {formatDate(budget?.criado_em)}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="font-semibold text-gray-800">Status:</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {status ? "Finalizado" : "Aguardando"}
            </span>
            <Switch
              checked={status}
              color="primary"
              startContent={<CheckCheck color="#fff" />}
              size="md"
              onValueChange={handleToggle}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={handleWhatsAppRedirect}
            className="w-full bg-[#204F46] text-white py-3 px-4 rounded-lg hover:bg-green-600 transition shadow-md"
          >
            Contatar no WhatsApp
          </button>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;
