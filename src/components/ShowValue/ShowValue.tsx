import { useEffect, useRef, useState } from "react";
import { Check, Pencil } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Approval } from "@/app/(auth)/homologacao/[id]/page";

export default function ShowValue({
  value,
  setValue,
  keyName,
  isEditable = false,
  label,
}: {
  value: string | undefined | null;
  setValue: Dispatch<SetStateAction<Approval | null>>;
  keyName: keyof Approval;
  isEditable?: boolean;
  label: string;
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

  return (
    <div>
      <label className="text-sm text-slate-700 mb-1 font-medium">{label}</label>
      <div
        ref={containerRef}
        className="w-full rounded-lg h-12 flex items-center justify-center bg-slate-100 p-2"
      >
        {isEditing ? (
          <div className="flex items-center w-full h-full">
            <input
              type="text"
              value={tempValue || ""}
              onChange={(e) => setTempValue(e.target.value)}
              disabled={!isEditable}
              className="w-full h-full bg-slate-100 outline-none"
            />
            <button onClick={handleSave} disabled={!isEditable}>
              <Check />
            </button>
          </div>
        ) : (
          <div className="flex items-center w-full h-full">
            <span className="flex items-center w-full h-full">
              {value || "N/A"}
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
