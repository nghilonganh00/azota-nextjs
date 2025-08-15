"use client";

import { IExam, IExamClass, IExamStudent } from "@/interfaces";
import ExamAPI from "@/lib/api/exam";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfigOther from "./components/ConfigOther";
import ConfigFee from "./components/ConfigFee";
import ConfigAnswerAndQuestion from "./components/ConfigAnswerAndQuestion";
import ConfigMixed from "./components/ConfigMixed";
import ConfigSecurity from "./components/ConfigSecurity";
import ConfigGeneral from "./components/ConfigGeneral";
import ConfigType from "./components/ConfigType";
import Actions from "./components/Actions";

export default function ConfigExamOnline() {
  const router = useRouter();
  const { id: examId } = useParams<{ id: string }>();

  const [examConfig, setExamConfig] = useState<IExam>({} as IExam);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [assignedClassIds, setAssignedClassIds] = useState<number[]>([]);
  const [assignedStudentIds, setAssignedStudentIds] = useState<number[]>([]);

  const handleChangeConfig = (name: string, newValue: any) => {
    setExamConfig((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!examConfig.title || examConfig.title.trim() === "") {
      newErrors.title = "Tiêu đề bài thi không được để trống";
      valid = false;
    }

    if (!examConfig.startDate || !examConfig.endDate) {
      newErrors.date = "Ngày giao đề và hạn thi không được để trống";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handlePublish = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    if (!examId) return;

    const response: any = await ExamAPI.publish(examId, examConfig, assignedStudentIds, assignedClassIds);

    if (response && response.status === 201) {
      const updatedExam: IExam = response.data;
      router.push(`/teacher/exam/publish-exam/${updatedExam.hashId}`);
    }
  };

  const fetchExamData = async () => {
    if (examId) {
      const response = await ExamAPI.getConfig(examId);
      const data: IExam = response?.data;
      setExamConfig(data);
      setAssignedClassIds(() => data.examClasses.map((examClass: IExamClass) => examClass.classroom.id));
      setAssignedStudentIds(() => data.examStudents?.map((examStudent: IExamStudent) => examStudent.studentClass.id));
    }
  };

  useEffect(() => {
    fetchExamData();
  }, []);

  console.log("config-exam-online: ", examId);

  return (
    <div className="w-full px-5 dark:text-slate-300">
      {examConfig && Object.keys(examConfig).length !== 0 && (
        <div className="mx-auto max-w-[1150px] space-y-6 text-sm">
          <div className="pt-4 text-center font-semibold text-gray-800 dark:text-slate-300">{`Tên đề thi: ${examConfig.title} - Mã đề: ${examConfig.hashId}`}</div>
          <ConfigType examConfig={examConfig} setExamConfig={setExamConfig} handleChangeConfig={handleChangeConfig} />
          <ConfigGeneral
            examConfig={examConfig}
            assignedclassrooms={assignedClassIds}
            setAssignedclassrooms={setAssignedClassIds}
            assignedStudentIds={assignedStudentIds}
            setAssignedStudentIds={setAssignedStudentIds}
            handleChangeConfig={handleChangeConfig}
            errors={errors}
            setErrors={setErrors}
          />

          {examConfig.examType === "TEST" && (
            <ConfigSecurity
              examConfig={examConfig}
              setExamConfig={setExamConfig}
              handleChangeConfig={handleChangeConfig}
            />
          )}

          <ConfigMixed examConfig={examConfig} setExamConfig={setExamConfig} handleChangeConfig={handleChangeConfig} />

          {examConfig.examType === "TEST" && (
            <ConfigAnswerAndQuestion
              examConfig={examConfig}
              setExamConfig={setExamConfig}
              handleChangeConfig={handleChangeConfig}
            />
          )}

          <ConfigFee examConfig={examConfig} setExamConfig={setExamConfig} handleChangeConfig={handleChangeConfig} />

          {examConfig.examType === "TEST" && (
            <ConfigOther
              examConfig={examConfig}
              setExamConfig={setExamConfig}
              handleChangeConfig={handleChangeConfig}
            />
          )}
          <Actions handlePublish={handlePublish} />
        </div>
      )}
    </div>
  );
}
