import { httpClient } from "../../axios/httpClient";

export const PaymentApi = {
  createContractPayment: async (data) => {
    const response = await httpClient.post(
      "/payment/contract-payment/pay",
      data
    );
    return response.data;
  },
  createDirectPayment: async (data) => {
    const response = await httpClient.post("/payment/direct-payment/pay", data);
    return response.data;
  },
  //
  createTonContractPayment: async (data) => {
    const response = await httpClient.post(
      "/payment/contract-payment/pay-ton",
      data
    );
    return response.data;
  },
};
