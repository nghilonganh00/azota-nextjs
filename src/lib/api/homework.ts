import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import { IHomework, IHomeworkFile, INewHomework } from "@/interfaces";
import FirebaseStorage from "../firebaseStorage";

const HOMEWORK_API_URL = `homeworks`;

const HomeworkAPI = {
  getAll: async (
    sortParameter?: string,
    sortOrder?: string,
    limit?: number,
    page?: number,
    searchField?: string,
    searchKeyword?: string
  ): Promise<AxiosResponse> => {
    try {
      const url = "homeworks";

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
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  getAllByClassId: async (classId: string): Promise<AxiosResponse | null> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `homework/classroom/${classId}`;

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getDetail: async (homeworkId: string): Promise<AxiosResponse> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const url = `homeworks/${homeworkId}`;

      const response = await axiosInstance.get(url, {
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
  getByHashId: async (hashId: string): Promise<AxiosResponse> => {
    try {
      const url = `homeworks/hash/${hashId}`;

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  getResultOfClass: async (homeworkId: string) => {
    try {
      const url = `homework/${homeworkId}/homework-results`;

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  getSubmissionsById: async (homeworkId: number | string): Promise<AxiosResponse> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const url = `homeworks/${homeworkId}/submission`;

      const response = await axiosInstance.get(url, {
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
  getClassWithHomework: async () => {
    try {
      const url = "homework/class";

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  getConfig: async (homeworkId: string) => {
    try {
      const url = `homeworks/${homeworkId}`;

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  trash: async (homeworkId: string) => {
    try {
      const url = `homework/${homeworkId}/trash`;

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.log("Error in homeworkAPI.trash: ", error);
      return {};
    }
  },

  create: async (newHomework: INewHomework) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { homeworkFiles } = newHomework;

      const homeworkFileObj = await Promise.all(
        homeworkFiles.map(async (homeworkFile: File) => {
          const uploadFile = await FirebaseStorage.upload(homeworkFile);
          return {
            title: uploadFile.filename,
            link: uploadFile.downloadURL,
          };
        })
      );

      const response = await axiosInstance.post(
        "homeworks/",
        { ...newHomework, homeworkFiles: homeworkFileObj },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  update: async (homework: IHomework): Promise<AxiosResponse> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.put(`${HOMEWORK_API_URL}/${homework.id}`, homework, {
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

  updateContent: async (homeworkId: string, content: string): Promise<AxiosResponse | null> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.patch(
        `${HOMEWORK_API_URL}/${homeworkId}/content`,
        { content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  remove: async (homeworkId: string | number): Promise<AxiosResponse | null> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.delete(`${HOMEWORK_API_URL}/${homeworkId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getMyUpcomingInClassroom: async (classroomId: string): Promise<AxiosResponse | null> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.get(`${HOMEWORK_API_URL}/classroom/${classroomId}/me/upcoming`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default HomeworkAPI;
