import { BarChartGraphic } from "@/components/BarChart/BarChart";
import { LineChartGraphic } from "@/components/LineChart/LineChart";

export default function Dashboard() {
  return (
    <>
      <main className="w-[calc(100vw-288px)] px-10 py-10 gap-4 flex flex-col">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="flex w-full justify-between">
          <section className="w-[48%]">
            <BarChartGraphic />
          </section>
          <section className="w-[48%]">
            <LineChartGraphic />
          </section>
        </div>
        <div className="flex w-full justify-between">
          <section className="w-[48%]">
            <BarChartGraphic />
          </section>
          <section className="w-[48%]">
            <LineChartGraphic />
          </section>
        </div>
      </main>
    </>
  );
}
