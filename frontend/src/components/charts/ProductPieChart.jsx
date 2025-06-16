// frontend/src/components/charts/ProductPieChart.jsx

import Plot from "react-plotly.js";
import { useQuery } from "@tanstack/react-query";
import { fetchProductRanking } from "../../api";
import { useChartTheme } from "../../hooks/useChartTheme";
import { useWindowSize } from "../../hooks/useWindowSize";

export default function ProductPieChart() {
  const chartTheme = useChartTheme();
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["productRanking"],
    queryFn: async () => (await fetchProductRanking()).data,
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

  const topProducts = data ? data.slice(0, 10) : [];

  return (
    <Plot
      data={[
        {
          values: topProducts.map((p) => parseInt(p.total_sold, 10)),
          labels: topProducts.map((p) => p.product_name),
          type: "pie",
          hovertemplate:
            "<b>%{label}</b><br>Sold: %{value}<br>%{percent}<extra></extra>",
          textinfo: "percent",
          insidetextorientation: "radial",
        },
      ]}
      layout={{
        ...chartTheme,
        title: {
          text: "Top 10 Most Sold Products by Quantity",
          font: {
            color: chartTheme.font.color,
            size: isMobile ? 16 : 20,
          },
          x: 0.5,
          xanchor: "center",
          y: 0.95,
          yanchor: "top",
        },
        margin: { l: 20, r: 20, b: 40, t: 80 },
        showlegend: !isMobile,
      }}
      className="w-full h-full"
      useResizeHandler
    />
  );
}
