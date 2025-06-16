import Plot from "react-plotly.js";
import { useQuery } from "@tanstack/react-query";
import { fetchSalesCorrelation } from "../../api";
import { useChartTheme } from "../../hooks/useChartTheme";
import { useWindowSize } from "../../hooks/useWindowSize";

export default function SalesCorrelationScatterPlot() {
  const chartTheme = useChartTheme();
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const {
    data: rawData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["salesCorrelation"],
    queryFn: async () => (await fetchSalesCorrelation()).data,
  });

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center dark:text-gray-300">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        Error fetching data
      </div>
    );

  const plotData = rawData
    ? Object.entries(rawData).map(([stateName, points]) => ({
        x: points.map((p) => p.x),
        y: points.map((p) => p.y),
        name: stateName,
        mode: "markers",
        type: "scatter",
        hovertemplate: `<b>${stateName}</b><br>Qty: %{x}<br>Discount: %{y:.2f}<extra></extra>`,
      }))
    : [];

  return (
    <Plot
      data={plotData}
      layout={{
        ...chartTheme,
        title: {
          text: "Correlation: Discount vs. Quantity Sold",
          font: {
            color: chartTheme.font.color,
            size: isMobile ? 16 : 20,
          },
          x: 0.5,
          xanchor: "center",
          y: 0.95,
          yanchor: "top",
        },
        margin: { l: 50, r: 20, b: 50, t: 100 },
        xaxis: { ...chartTheme.xaxis, title: "Quantity Sold" },
        yaxis: { ...chartTheme.yaxis, title: "Discount Applied" },
        showlegend: !isMobile,
      }}
      className="w-full h-full"
      useResizeHandler
    />
  );
}
