import Plot from "react-plotly.js";
import { useQuery } from "@tanstack/react-query";
import { fetchStateHeatmapData } from "../../api";
import { useChartTheme } from "../../hooks/useChartTheme";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useThemeStore } from "../../store/themeStore";

const stateAbbreviations = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
  "District of Columbia": "DC",
};

export default function StateSalesHeatmap() {
  const chartTheme = useChartTheme();
  const theme = useThemeStore((state) => state.theme);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["stateHeatmapData"],
    queryFn: async () => (await fetchStateHeatmapData()).data,
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
  if (!data || data.length === 0)
    return (
      <div className="h-full flex items-center justify-center dark:text-gray-300">
        No data available for heatmap.
      </div>
    );

  const plotData = [
    {
      type: "choropleth",
      locationmode: "USA-states",
      locations: data.map((d) => stateAbbreviations[d.state] || d.state),
      z: data.map((d) => parseInt(d.total_quantity, 10)),
      text: data.map((d) => `${d.state}<br>Sales: ${d.total_quantity}`),
      hoverinfo: "text",
      colorscale: chartTheme.colorscale,
      colorbar: {
        title: "",
        orientation: isMobile ? "h" : "v",
        thickness: 15,
        len: 0.8,
        x: isMobile ? 0.5 : 1.05,
        xanchor: isMobile ? "center" : "left",
        y: isMobile ? -0.15 : 0.5,
        yanchor: isMobile ? "top" : "middle",
      },
    },
  ];

  return (
    <Plot
      data={plotData}
      layout={{
        ...chartTheme,
        title: {
          text: "Total Product Quantity Sold by State",
          font: { color: chartTheme.font.color, size: isMobile ? 16 : 20 },
          x: 0.5,
          xanchor: "center",
          y: 0.95,
          yanchor: "top",
        },
        geo: {
          scope: "usa",
          showlakes: true,
          lakecolor: theme === "dark" ? "#1f2937" : "#ffffff",
          bgcolor: "rgba(0,0,0,0)",
        },
        margin: { l: 0, r: 0, b: isMobile ? 80 : 20, t: 80 },
      }}
      className="w-full h-full"
      useResizeHandler
    />
  );
}
