"use client";
import { useApproval } from "@/hook/useApproval";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { formatText } from "@/utils/truncate";
import LoadingPartial from "@/components/LoadingPartial/Loading";
import ShowValue from "@/components/ShowValue/ShowValue";
import ShowSelect from "@/components/ShowSelect/ShowSelect";

export interface Approval {
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
  contas_receber_credito: any[];
  documentos: any[];
}

export default function Homologacoes() {
  const { findUnique } = useApproval();
  const { id } = useParams();
  const [approval, setApproval] = useState<Approval | null>(null);
  const [approvalUpdate, setApprovalUpdate] = useState<Approval | null>(null);
  const [status, setStatus] = useState<boolean>(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [newDocument, setNewDocument] = useState<File | null>(null);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const data = await findUnique(String(id));
    setApproval(data);
    setApprovalUpdate(data);
    setStatus(data?.status || false);
    setDocuments(data?.documentos || []);
  };

  const handleToggleStatus = async () => {
    const updatedStatus = !status;
    setStatus(updatedStatus);
    // await updateStatus(String(id), updatedStatus);
  };

  const handleFileUpload = async () => {
    if (newDocument) {
      const formData = new FormData();
      formData.append("file", newDocument);
      // await uploadDocument(String(id), formData);
      setNewDocument(null);
      get();
    }
  };

  if (!approval)
    return (
      <main className="w-[calc(100vw-288px)] px-10 py-10 gap-4 flex flex-col">
        <LoadingPartial />;
      </main>
    );

  return (
    <main className="w-[calc(100vw-288px)] px-10 py-10 gap-4 flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800">
        Homologação de{" "}
        <span className="text-primary font-bold">
          &quot;{approval.nome}&quot;
        </span>
      </h1>

      {/* Informações principais */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Detalhes</h2>

        <div className="grid grid-cols-4 gap-4 w-full">
          <ShowValue
            value={approvalUpdate?.nome}
            setValue={setApprovalUpdate}
            keyName="nome"
            label="Nome"
          />

          <ShowValue
            value={approvalUpdate?.email}
            setValue={setApprovalUpdate}
            keyName="email"
            label="E-mail"
          />

          <ShowValue
            value={approvalUpdate?.numero_conta_contrato}
            setValue={setApprovalUpdate}
            keyName="numero_conta_contrato"
            label="Conta contrato"
          />

          <ShowValue
            value={approvalUpdate?.telefone}
            setValue={setApprovalUpdate}
            keyName="telefone"
            label="Telefone"
            isEditable
          />

          <ShowSelect
            value={String(approvalUpdate?.ampliacao)}
            setValue={setApprovalUpdate}
            keyName="ampliacao"
            label="Ampliação"
            isEditable={true}
            options={[
              { label: "Sim", value: "true" },
              { label: "Não", value: "false" },
            ]}
          />

          <ShowSelect
            value={String(approvalUpdate?.transformador)}
            setValue={setApprovalUpdate}
            keyName="transformador"
            label="Transformador próprio"
            isEditable={true}
            options={[
              { label: "Sim", value: "true" },
              { label: "Não", value: "false" },
            ]}
          />

          <ShowSelect
            value={approvalUpdate?.tipo_de_ligacao}
            setValue={setApprovalUpdate}
            keyName="tipo_de_ligacao"
            label="Tipo de ligação"
            isEditable={true}
            options={[
              { label: "MONOFÁSICA", value: "MONOFÁSICA" },
              { label: "BIFÁSICA", value: "BIFÁSICA" },
              { label: "TRIFÁSICA", value: "TRIFÁSICA" },
            ]}
          />

          <ShowSelect
            value={approvalUpdate?.tensao_de_fornecimento}
            setValue={setApprovalUpdate}
            keyName="tensao_de_fornecimento"
            label="Tensão de fornecimento"
            isEditable={true}
            options={[
              { label: "220/380", value: "220/380" },
              { label: "127/220", value: "127/220" },
            ]}
          />

         
        </div>
      </div>

      <div className="flex w-full gap-4">
        {/* Documentos */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Documentos</h2>
          <div className="flex flex-col gap-4">
            <ul className="max-h-56 overflow-diff overflow-auto">
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <div>
                    <a
                      href={doc.url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {formatText(doc.nome)}
                    </a>
                    <span className="ml-4 text-sm text-gray-500">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    download
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <Download size={20} />
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <input
                type="file"
                onChange={(e) => setNewDocument(e.target.files?.[0] || null)}
                className="file-input border-gray-300"
              />
              <button
                onClick={handleFileUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* Contas a receber crédito */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Contas a Receber Crédito
          </h2>
          {approval.contas_receber_credito?.length ? (
            <ul className="flex flex-col gap-4 overflow-diff overflow-auto max-h-72">
              {approval.contas_receber_credito.map((conta, idx) => (
                <li
                  key={idx}
                  className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <p className="font-medium text-gray-700">
                    Número: {conta.numero_conta_contrato}
                  </p>
                  <p className="text-gray-600">
                    Média Consumo: {conta.media_consumo_conta} kWh
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex w-full h-4/6 justify-center items-center">
              <p className="text-gray-500">Nenhuma conta cadastrada.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
