import ProductPieChart from "../components/charts/ProductPieChart";
import SalesCorrelationScatterPlot from "../components/charts/SalesCorrelationScatterPlot";
import StateSalesHeatmap from "../components/charts/StateSalesHeatmap";
import ThemeToggle from "../components/ThemeToggle";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
          Analytics Dashboard
        </h1>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-96">
          <ProductPieChart />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-96">
          <SalesCorrelationScatterPlot />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md col-span-1 lg:col-span-2 h-[500px]">
          <StateSalesHeatmap />
        </div>
      </div>
    </>
  );
}
