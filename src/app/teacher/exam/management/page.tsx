"use client";

import { useEffect, useState } from "react";
import ExamActions from "./components/examActions";
import RecommendExams from "./components/recommendExams";
import AllExams from "./components/allExams";
import ExamAPI from "@/lib/api/exam";
import { IExamPreview } from "@/interfaces/exam";

const ExamManage = () => {
  const [listExamConfig, setListExamConfig] = useState<IExamPreview[]>([]);

  useEffect(() => {
    const fetchAllExamConfig = async () => {
      const response = await ExamAPI.getPreviews();
      setListExamConfig(response?.data);
    };

    fetchAllExamConfig();
  }, []);

  console.log("list exam config: ", listExamConfig);

  return (
    <div className="space-y-4 p-6">
      <ExamActions />
      <RecommendExams listExamPrevies={listExamConfig} />
      <AllExams listExamConfig={listExamConfig} />
    </div>
  );
};

export default ExamManage;
