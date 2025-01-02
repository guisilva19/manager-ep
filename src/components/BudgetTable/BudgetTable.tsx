"use client";
import React, { useEffect, useState } from "react";
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
import { Pagination } from "@nextui-org/react";
import { useBudget } from "@/hook/useBudget";
import LoadingPartial from "../LoadingPartial/Loading";
import { formatDateToBR } from "@/utils/date";

interface Data {
  items: Budget;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface Budget {
  id: string;
  nome: string;
  email: string;
  cidade: string;
  telefone: string;
  endereco: string;
  local: string;
  status: boolean;
  valor_da_conta_de_luz: string;
  created_at: string;
  updated_at: string;
}

const BudgetTable = () => {
  const { list } = useBudget();

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [data, setData] = useState<Data>({} as Data);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(0); // 0 PARA TODOS | 1 PARA AGUARDANDO | 2 PARA FINALIZADOS

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get();
  }, [status]);

  const get = async () => {
    try {
      resetSearch();
      const result = await list(page, status);
      setData(result);
      setBudgets(result.items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWithNextPage();
  }, [page]);

  const getWithNextPage = async () => {
    try {
      const result = await list(page, status);
      setData(result);
      setBudgets(result.items);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setPage(1);
    setLoading(true);
  };

  const alterStatus = (sts: number) => {
    resetSearch();
    setStatus(sts);
  };

  const alterPage = (newPage: number) => {
    setLoading(true);
    setPage(newPage);
  };

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
              status === 0
                ? "bg-primary text-white"
                : "bg-slate-200 text-slate-700"
            }`}
            onClick={() => alterStatus(0)}
          >
            <List />
            Todas
          </button>
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              status === 2
                ? "bg-primary text-white"
                : "bg-slate-200 text-slate-700"
            }`}
            onClick={() => alterStatus(2)}
          >
            <CheckCircle />
            Concluídas
          </button>
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              status === 1
                ? "bg-primary text-white"
                : "bg-slate-200 text-slate-700"
            }`}
            onClick={() => alterStatus(1)}
          >
            <Clock />
            Aguardando
          </button>
        </div>
        <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg flex items-center">
          <SlidersHorizontal />
        </button>
      </div>

      {loading ? (
        <LoadingPartial />
      ) : (
        <>
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
                {budgets.map((budget: Budget) => (
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
                      {budget.valor_da_conta_de_luz}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {budget.cidade}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {budget.endereco}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {formatDateToBR(budget.created_at)}
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

          {!!data?.totalPages && (
            <div className="w-full flex justify-center mt-10">
              <Pagination
                showControls
                initialPage={1}
                page={page}
                total={data.totalPages}
                onChange={(page) => alterPage(page)}
                color="primary"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BudgetTable;
