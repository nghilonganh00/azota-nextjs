import { axiosInstance } from "../axiosInstance";

const accessToken = localStorage.getItem("accessToken");

export const TeacherAPI = {
  register: async () => {
    try {
      if (!accessToken) {
        throw new Error("Access Token not found in localStorage.");
      }

      const url = "teachers/register";

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      // Optionally log or handle error
      return null;
    }
  },
};
