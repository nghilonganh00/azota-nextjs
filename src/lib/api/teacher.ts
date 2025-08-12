import { axiosInstance } from "../axiosInstance";

export const TeacherAPI = {
  register: async () => {
    try {
      const url = "teachers/register";

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      // Optionally log or handle error
      return null;
    }
  },
};
