import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";
import { INewStudentClass } from "@/interfaces/studentClass";

const STUDENT_CLASS_API_URL = `student-classes`;

export const StudentClassroomAPI = {
  getSubmissionsByHomeworkId: async (homeworkId: string | number): Promise<AxiosResponse> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }

      const url = `student-classes/homework/${homeworkId}/submissions`;
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
  getByClassroomId: async (classroomId: string | number): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get(`${STUDENT_CLASS_API_URL}/classroom/${classroomId}`, {
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
  identify: async (id: string | number): Promise<AxiosResponse> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }

      const response = await axiosInstance.get(`student-classes/${id}/identify`, {
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

  create: async (studentClass: INewStudentClass): Promise<AxiosResponse | null> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }

      const response = await axiosInstance.post(`student-classes`, studentClass, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error("Error in StudentClassroomAPI.create: ", error);
      return null;
    }
  },

  createAnonymous: async (fullname: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.post(
        `${STUDENT_CLASS_API_URL}/anonymous`,
        { fullname },
        {
          headers: { "Content-type": "application/json" },
        }
      );

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  delete: async (id: string | number): Promise<AxiosResponse | null> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }

      const response = await axiosInstance.delete(`${STUDENT_CLASS_API_URL}/${id}`, {
        headers: { "Content-type": "application/json", Authorization: `Bearer ${accessToken}` },
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
