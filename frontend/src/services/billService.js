import api from "./api";

export const createBill = async (billData) => {
  try {
    const response = await api.post("/bills", billData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBills = async () => {
  try {
    const response = await api.get("/bills");
    return response.data;
  } catch (error) {
    throw error;
  }
};
