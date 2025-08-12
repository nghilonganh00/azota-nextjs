import { IStudentResult } from "@/interfaces";
import ExamResultAPI from "@/lib/api/examResult";
import { useEffect, useState } from "react";
import StudentResultList from "./StudentResultList";

const AssignedByAll = () => {
  const examId = Number(sessionStorage.getItem("examId")) || null;

  const [studentResults, setStudentResults] = useState<IStudentResult[]>([]);

  const fetchResultListData = async () => {
    if (examId) {
      const response = await ExamResultAPI.getLatestByExamAndClass(examId);

      setStudentResults(response?.data);
    }
  };

  useEffect(() => {
    fetchResultListData();
  }, []);

  return <StudentResultList studentResults={studentResults} />;
};

export default AssignedByAll;
