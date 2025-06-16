import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

export const fetchProductRanking = () =>
  axios.get(`${API_URL}/products/ranking`);
export const fetchSalesCorrelation = () =>
  axios.get(`${API_URL}/sales/correlation`);
export const fetchStateHeatmapData = () =>
  axios.get(`${API_URL}/sales/heatmap-by-state`);
