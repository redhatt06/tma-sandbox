import { httpClient } from "../../axios/httpClient";

export const PriceApi = {
  getPriceFeed: async (tokenType) => {
    const response = await httpClient.get(`/price/priceFeed/${tokenType}`);
    return response.data;
  },
  getBrinPrice: async () => {
    const response = await httpClient.get("/price/brin");
    return response.data;
  },
  getXtokenPrice: async () => {
    const response = await httpClient.get("/price/xtoken");
    return response.data;
  },
  getEstimatedCost: async (data) => {
    const response = await httpClient.post("/price/estimated_cost", data);
    return response.data;
  },
};
