"use client";

import { IHomeworkSubmission } from "@/interfaces";
import { HomeworkSubmissionAPI } from "@/lib/api/homeworkSubmission";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GraphicMarkArea } from "./components/GraphicMarkArea";
import { MarkArea } from "./components/MarkArea";
import { UpdateHomeworkSubmission } from "./libs/interface";

const MarkHomework = () => {
  const { id: homeworkSubmissionId } = useParams<{ id: string }>();

  const [homeworkSubmission, setHomeworkSubmission] = useState<IHomeworkSubmission | null>(null);

  const [updateHomeworkSubmission, setUpdateHomeworkSubmission] = useState<UpdateHomeworkSubmission>({
    point: "",
    comment: "",
    isShowPoint: false,
  });

  useEffect(() => {
    document.title = "Chấm điểm";

    const fetchSubmissionData = async () => {
      if (!homeworkSubmissionId) return;

      const response = await HomeworkSubmissionAPI.getDetail(homeworkSubmissionId);
      if (response?.status !== 200) {
        return;
      }
      setHomeworkSubmission(response.data);
      setUpdateHomeworkSubmission({
        point: response?.data?.point,
        comment: response?.data?.comment,
        isShowPoint: response?.data?.isShowPoint,
      });
    };

    fetchSubmissionData();
  }, [homeworkSubmissionId]);

  return (
    <div className="p-3">
      <div className="grid grid-cols-12 gap-4">
        <GraphicMarkArea homeworkSubmission={homeworkSubmission} />

        <MarkArea
          homeworkSubmission={homeworkSubmission}
          updateHomeworkSubmission={updateHomeworkSubmission}
          setUpdateHomeworkSubmission={setUpdateHomeworkSubmission}
        />
      </div>
    </div>
  );
};

export default MarkHomework;
