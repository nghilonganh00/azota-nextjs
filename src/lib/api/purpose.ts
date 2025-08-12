import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

const PurposeAPI = {
  getAll: async (): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get("purposes", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error("Error in PurposeAPI.getAll: ", error);
      return null;
    }
  },
};

export default PurposeAPI;
