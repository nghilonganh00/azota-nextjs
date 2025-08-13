import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const ClassroomAPI = {
  getMyClassrooms: async (): Promise<AxiosResponse> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.get(`classrooms/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Add class api response: ", response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getStudents: async (classId: string | number): Promise<AxiosResponse> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.get(`classrooms/${classId}/students`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Add class api response: ", response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getHomeworks: async (
    sortParameter?: string,
    sortOrder?: string,
    limit?: number,
    page?: number,
    searchField?: string,
    searchKeyword?: string
  ): Promise<AxiosResponse> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const url = "classrooms/homeworks";

      const params = {
        sortField: sortParameter,
        sortOrder: sortOrder,
        limit,
        page,
        searchField,
        searchKeyword,
      };

      const response = await axiosInstance.get(url, {
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  create: async (className: string, classYear: string, classGroupId?: number) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.post(
        "classrooms",
        {
          className,
          classYear,
          classgroupId: classGroupId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Add class api response: ", response);
      return response;
    } catch (error) {
      console.log("Error in ClassroomAPI: ", error);
      return {};
    }
  },
};
