"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  List,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  User,
  SlidersHorizontal,
} from "lucide-react";
import { formatDateToBR } from "@/utils/date";
import { Pagination } from "@nextui-org/react";

const BudgetTable = () => {
  const [page, setPage] = useState(1);

  const budgets = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(77) 99957-7372",
      local: "Comercial",
      valorConta: "R$ 450,00",
      cidade: "São Paulo",
      endereco: "Rua das Flores, 123",
      createdAt: "2024-12-21",
      status: true, // Concluído
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      email: "maria@email.com",
      telefone: "(77) 99957-7372",
      local: "Residencial",
      valorConta: "R$ 350,00",
      cidade: "Rio de Janeiro",
      endereco: "Avenida Atlântica, 456",
      createdAt: "2024-12-20",
      status: false, // Aguardando
    },
    {
      id: 3,
      nome: "Carlos Pereira",
      email: "carlos@email.com",
      telefone: "(77) 99957-7372",
      local: "Industrial",
      valorConta: "R$ 1.200,00",
      cidade: "Belo Horizonte",
      endereco: "Rua Diamante, 789",
      createdAt: "2024-12-19",
      status: true, // Concluído
    },
    {
      id: 4,
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(77) 99957-7372",
      local: "Comercial",
      valorConta: "R$ 450,00",
      cidade: "São Paulo",
      endereco: "Rua das Flores, 123",
      createdAt: "2024-12-21",
      status: true, // Concluído
    },
    {
      id: 5,
      nome: "Maria Oliveira",
      email: "maria@email.com",
      telefone: "(77) 99957-7372",
      local: "Residencial",
      valorConta: "R$ 350,00",
      cidade: "Rio de Janeiro",
      endereco: "Avenida Atlântica, 456",
      createdAt: "2024-12-20",
      status: false, // Aguardando
    },
    {
      id: 6,
      nome: "Carlos Pereira",
      email: "carlos@email.com",
      telefone: "(77) 99957-7372",
      local: "Industrial",
      valorConta: "R$ 1.200,00",
      cidade: "Belo Horizonte",
      endereco: "Rua Diamante, 789",
      createdAt: "2024-12-19",
      status: true, // Concluído
    },
    {
      id: 7,
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(77) 99957-7372",
      local: "Comercial",
      valorConta: "R$ 450,00",
      cidade: "São Paulo",
      endereco: "Rua das Flores, 123",
      createdAt: "2024-12-21",
      status: true, // Concluído
    },
    {
      id: 8,
      nome: "Maria Oliveira",
      email: "maria@email.com",
      telefone: "(77) 99957-7372",
      local: "Residencial",
      valorConta: "R$ 350,00",
      cidade: "Rio de Janeiro",
      endereco: "Avenida Atlântica, 456",
      createdAt: "2024-12-20",
      status: false, // Aguardando
    },
    {
      id: 9,
      nome: "Carlos Pereira",
      email: "carlos@email.com",
      telefone: "(77) 99957-7372",
      local: "Industrial",
      valorConta: "R$ 1.200,00",
      cidade: "Belo Horizonte",
      endereco: "Rua Diamante, 789",
      createdAt: "2024-12-19",
      status: true, // Concluído
    },
    {
      id: 10,
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(77) 99957-7372",
      local: "Comercial",
      valorConta: "R$ 450,00",
      cidade: "São Paulo",
      endereco: "Rua das Flores, 123",
      createdAt: "2024-12-21",
      status: true, // Concluído
    },
    {
      id: 11,
      nome: "Maria Oliveira",
      email: "maria@email.com",
      telefone: "(77) 99957-7372",
      local: "Residencial",
      valorConta: "R$ 350,00",
      cidade: "Rio de Janeiro",
      endereco: "Avenida Atlântica, 456",
      createdAt: "2024-12-20",
      status: false, // Aguardando
    },
    {
      id: 12,
      nome: "Carlos Pereira",
      email: "carlos@email.com",
      telefone: "(77) 99957-7372",
      local: "Industrial",
      valorConta: "R$ 1.200,00",
      cidade: "Belo Horizonte",
      endereco: "Rua Diamante, 789",
      createdAt: "2024-12-19",
      status: true, // Concluído
    },
  ];

  // Estado para o filtro
  const [filter, setFilter] = useState("Todas");

  // Função para filtrar os dados
  const filteredBudgets =
    filter === "Todas"
      ? budgets
      : budgets.filter((budget) =>
          filter === "Concluidas" ? budget.status : !budget.status
        );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        Orçamentos Solicitados
      </h2>

      {/* Filtros */}
      <div className="flex justify-between items-center w-full mb-5 h-max">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              filter === "Todas"
                ? "bg-primary text-white"
                : "bg-slate-200 text-slate-700"
            }`}
            onClick={() => setFilter("Todas")}
          >
            <List />
            Todas
          </button>
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              filter === "Concluidas"
                ? "bg-primary text-white"
                : "bg-slate-200 text-slate-700"
            }`}
            onClick={() => setFilter("Concluidas")}
          >
            <CheckCircle />
            Concluídas
          </button>
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              filter === "Aguardando"
                ? "bg-primary text-white"
                : "bg-slate-200 text-slate-700"
            }`}
            onClick={() => setFilter("Aguardando")}
          >
            <Clock />
            Aguardando
          </button>
        </div>
        <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg flex items-center">
          <SlidersHorizontal />
        </button>
      </div>

      {/* Tabela */}
      <div className="">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center gap-2">
                  <User />
                  Nome
                </div>
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center gap-2">
                  <Mail />
                  E-mail
                </div>
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center gap-2">
                  <Phone />
                  Telefone
                </div>
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center gap-2">
                  <MapPin />
                  Local
                </div>
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center gap-2">
                  <DollarSign />
                  Conta
                </div>
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center gap-2">
                  <MapPin />
                  Cidade
                </div>
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center gap-2">
                  <MapPin />
                  Endereço
                </div>
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center gap-2">
                  <Calendar />
                  Solicitado
                </div>
              </th>
              <th className="border border-gray-200 px-4 py-2 text-center">
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle />
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {filteredBudgets.map((budget) => (
              <tr
                key={budget.id}
                className="hover:bg-slate-50 text-sm cursor-pointer"
              >
                <td className="border border-gray-200 px-4 py-2">
                  {budget.nome}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {budget.email}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {budget.telefone}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {budget.local}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {budget.valorConta}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {budget.cidade}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {budget.endereco}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {formatDateToBR(budget.createdAt)}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  {budget.status ? (
                    <CheckCircle className="text-[#229718] mx-auto" />
                  ) : (
                    <Clock className="text-[#d6ae29] mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-center mt-10">
        <Pagination
          showControls
          initialPage={1}
          page={page}
          total={3}
          onChange={(page) => setPage(page)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default BudgetTable;
