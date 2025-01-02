"use client";
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  List,
  Mail,
  Phone,
  User,
  FileDigit,
  SlidersHorizontal,
} from "lucide-react";
import { Pagination } from "@nextui-org/react";
import { useApproval } from "@/hook/useApproval";
import { useRouter } from "next/navigation";
import LoadingPartial from "../LoadingPartial/Loading";

interface Data {
  items: Approval;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface Approval {
  id: string;
  nome: string;
  email: string;
  ampliacao: boolean;
  telefone: string;
  link_payment: string;
  status_payment: boolean;
  cabo_do_padrao: string;
  carga_instalada: string | null;
  disjuntor_do_padrao: string | null;
  distancia_entre_inversor_e_distribuicao: string | null;
  modelo_do_inversor_homologado: string | null;
  modelo_do_inversor_inserido: string | null;
  modelo_do_modulo_homologado: string | null;
  modelo_do_modulo_inserido: string | null;
  numero_conta_contrato: string;
  outras_conta_recebera_credito: boolean;
  quantidade_inversores_homologados: string | null;
  quantidade_inversores_inseridos: string | null;
  quantidade_medidores: string | null;
  quantidade_modulos_homologados: string | null;
  quantidade_modulos_inseridos: string | null;
  tensao_de_fornecimento: string | null;
  tipo_de_ligacao: string;
  total_de_inversores: string | null;
  total_de_modulos: string | null;
  transformador: boolean;
  status: boolean;
  contas_receber_credito: any[];
  documentos: any[];
}

const ApprovalTable = () => {
  const router = useRouter();

  const { list } = useApproval();

  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [data, setData] = useState<Data>({} as Data);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get();
  }, [status]);

  const get = async () => {
    try {
      resetSearch();
      const result = await list(page, status);
      setData(result);
      setApprovals(result.items);
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
      setApprovals(result.items);
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

  console.log("HERE", approvals);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        Homologações
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

      {/* Tabela */}
      {loading ? (
        <LoadingPartial />
      ) : (
        <>
          <div className="">
            <table className="table-auto w-full border-collapse border border-gray-200 relative">
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
                      <FileDigit />
                      Conta Contrato
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

              {approvals.length ? (
                <tbody>
                  {approvals.map((approval) => (
                    <tr
                      key={approval.id}
                      onClick={() => router.push(`/homologacao/${approval.id}`)}
                      className="hover:bg-slate-50 text-sm cursor-pointer"
                    >
                      <td className="border border-gray-200 px-4 py-2">
                        {approval.nome}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {approval.email}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {approval.telefone}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {approval.numero_conta_contrato}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {approval.status ? (
                          <CheckCircle className="text-[#229718] mx-auto" />
                        ) : (
                          <Clock className="text-[#d6ae29] mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <div className="h-12 absolute top-20 flex items-center justify-center inset-0">
                  <p className="text-slate-500 font-">
                    Nenhuma homologação existente!
                  </p>
                </div>
              )}
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

export default ApprovalTable;
