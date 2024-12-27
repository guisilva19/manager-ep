import { useEffect, useRef, useState } from "react";
import { Check, Pencil } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Approval } from "@/app/(auth)/homologacao/[id]/page";

type SelectOption = {
  label: string;
  value: string;
};

export default function ShowSelect({
  value,
  setValue,
  keyName,
  isEditable = false,
  label,
  options,
}: {
  value: string | undefined | null;
  setValue: Dispatch<SetStateAction<Approval | null>>;
  keyName: keyof Approval;
  isEditable?: boolean;
  label: string;
  options: SelectOption[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSave = () => {
    if (tempValue !== value) {
      setValue((prev) => {
        if (!prev) return prev;
        return { ...prev, [keyName]: tempValue };
      });
    }
    setIsEditing(false);
  };

  useEffect(() => {
    setTempValue(value);
  }, [value]);


  console.log()

  useEffect(() => {
    // Função que lida com o clique fora
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleSave(); // Salva se o clique foi fora do componente
      }
    };

    // Adiciona o listener
    document.addEventListener("mousedown", handleClickOutside);

    // Limpeza do listener ao desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mapeia o valor para o label correspondente
  const selectedLabel = options.find((option) => option.value === value)?.label || "N/A";

  return (
    <div>
      <label className="text-sm text-slate-700 mb-1 font-medium">{label}</label>
      <div
        ref={containerRef}
        className="w-full rounded-lg h-12 flex items-center justify-center bg-slate-100 p-2"
      >
        {isEditing ? (
          <div className="flex items-center w-full h-full">
            <select
              value={tempValue || ""}
              onChange={(e) => setTempValue(e.target.value)}
              disabled={!isEditable}
              className="w-full h-full bg-slate-100 outline-none"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button onClick={handleSave} disabled={!isEditable}>
              <Check />
            </button>
          </div>
        ) : (
          <div className="flex items-center w-full h-full">
            <span className="flex items-center w-full h-full">
              {selectedLabel}
            </span>
            {isEditable && (
              <button onClick={() => setIsEditing(true)}>
                <Pencil />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
