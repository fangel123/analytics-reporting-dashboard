import { useThemeStore } from "../store/themeStore";

export const useChartTheme = () => {
  const theme = useThemeStore((state) => state.theme);

  if (theme === "dark") {
    return {
      paper_bgcolor: "#1f2937",
      plot_bgcolor: "#1f2937",
      font: {
        color: "#d1d5db",
      },
      legend: {
        font: {
          color: "#d1d5db",
        },
      },
      xaxis: {
        gridcolor: "#374151",
        tickfont: { color: "#9ca3af" },
      },
      yaxis: {
        gridcolor: "#374151",
        tickfont: { color: "#9ca3af" },
      },
      colorscale: "YlGnBu",
    };
  } else {
    return {
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
      font: {
        color: "#111827",
      },
      legend: {
        font: {
          color: "#111827",
        },
      },
      xaxis: {
        gridcolor: "#e5e7eb",
        tickfont: { color: "#374151" },
      },
      yaxis: {
        gridcolor: "#e5e7eb",
        tickfont: { color: "#374151" },
      },
      colorscale: "Blues",
    };
  }
};
