"use client";
import BudgetModal from "@/components/BudgetModal/BudgetModal";
import BudgetTable, { Budget } from "@/components/BudgetTable/BudgetTable";
import { useState } from "react";

export default function Projetos() {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [isModalBudget, setIsModalBudget] = useState<boolean>(false);

  const onClose = () => {
    setIsModalBudget(false);
    setBudget(null);
  };

  const onUpdateStatus = (newStatus: boolean) => {
    console.log("NEW STATUS", newStatus)
    console.log("OLD STATUS", budget?.status)
  };

  return (
    <>
      <main className="w-[calc(100vw-288px)] px-10 py-10 gap-4 flex flex-col">
        <BudgetTable
          setBudget={setBudget}
          setIsModalBudget={setIsModalBudget}
        />
      </main>

      <BudgetModal
        isOpen={isModalBudget}
        budget={budget}
        onClose={onClose}
        onUpdateStatus={onUpdateStatus}
      />
    </>
  );
}
