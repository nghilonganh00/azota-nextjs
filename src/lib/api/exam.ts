import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import { ICreateExam, IExam } from "@/interfaces/exam";

const accessToken = localStorage.getItem("accessToken");
const EXAM_API_URL = `exams`;

const ExamAPI = {
  create: async ({
    examName,
    gradeId,
    subjectId,
    purposeId,
    examDescribe,
    examContent,
  }: ICreateExam): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access Token not found in localStorage.");
      }

      const requestBody = {
        title: examName,
        gradeId,
        subjectId,
        purposeId,
        examDescribe,
        content: examContent,
      };

      const response = await axiosInstance.post(`${EXAM_API_URL}`, requestBody, {
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
  getAllConfigs: async (): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        return null;
      }

      const response = await axiosInstance.post("/exam/preview", {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getPreviews: async (): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }

      const response = await axiosInstance.get(`${EXAM_API_URL}/previews`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: 1,
          limit: 20,
          sortField: "createdAt",
          sortOrder: "ASC",
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getConfig: async (id: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get(`${EXAM_API_URL}/${id}/config`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  previewByHashId: async (hashId: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get(`${EXAM_API_URL}/hash-id/${hashId}/preview`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getContent: async (id: string): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axiosInstance.get(`${EXAM_API_URL}/${id}/content`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log("Fetch exam content failed");
      return null;
    }
  },

  getContentByHashId: async (hashId: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get(`${EXAM_API_URL}/hash-id/${hashId}/content`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  publish: async (
    examId: number | string,
    examConfig: IExam,
    assignedStudentIds: number[],
    assignedClassIds: number[]
  ): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.post(
        `${EXAM_API_URL}/${examId}/publish`,
        { ...examConfig, assignedClassIds, assignedStudentIds },
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

  updatedConfigByHashId: async (exam: IExam) => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `exam/config/${exam.hashId}`;

      const response = await axiosInstance.put(url, exam, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      return response;
    } catch (error) {
      console.error(`Error in ExamAPI.updatedConfigByHashId: ${error}`);
      return {};
    }
  },

  remove: async (id: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.delete(`${EXAM_API_URL}/${id}`, {
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

export default ExamAPI;
