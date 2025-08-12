"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IClassgroup, INewHomework } from "@/interfaces";
import HomeworkAPI from "@/lib/api/homework";
import ClassGroupAPI from "@/lib/api/classgroup";
import Head from "next/head";
import ConfigName from "./components/ConfigName";
import ConfigTime from "./components/configTime";
import ConfigContent from "./components/ConfigContent";
import ConfigFeature from "./components/ConfigFeature";
import ConfigAssignment from "./components/ConfigAssigment";
import Actions from "./components/Actions";

const AddHomework = () => {
  const router = useRouter();

  const [classGroups, setClassGroups] = useState<IClassgroup[]>([]);
  const [newHomework, setNewHomework] = useState<INewHomework>({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    isShowResult: false,
    isMustLogin: false,
    isInTrash: false,
    classroomIds: [],
    homeworkFiles: [],
  });
  const [error, setError] = useState<{ title: string; date: string; classroomIds: string }>({
    title: "",
    date: "",
    classroomIds: "",
  });

  const handleChangeTextInput = (name: string, newValue: string | boolean | number[]) => {
    setNewHomework((preValue) => ({ ...preValue, [name]: newValue }));
    if (name === "title") {
      setError((prevValue) => ({ ...prevValue, title: "" }));
    }
    if (name === "startDate" || name === "endDate") {
      setError((prevValue) => ({ ...prevValue, date: "" }));
    }
    if (name === "classroomIds") {
      setError((prevValue) => ({ ...prevValue, classroomIds: "" }));
    }
  };

  const handleChangeFileInput = (name: string, newValue: File[]) => {
    setNewHomework((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handlePublish = async () => {
    try {
      let isError = false;

      if (newHomework.title.trim() === "") {
        setError((prevValue) => ({ ...prevValue, title: "Tên bài tập không được để trống" }));
        isError = true;
      }

      if (new Date(newHomework.startDate) > new Date(newHomework.endDate)) {
        setError((prevValue) => ({ ...prevValue, date: "Thời gian nộp bài không hợp lệ" }));
        isError = true;
      }

      if (newHomework.classroomIds.length === 0) {
        setError((prevValue) => ({ ...prevValue, classroomIds: "Vui lòng chọn lớp học" }));
        isError = true;
      }

      if (newHomework.classroomIds.length > 10) {
        setError((prevValue) => ({ ...prevValue, classroomIds: "Vui lòng chọn tối đa 10 lớp học" }));
        isError = true;
      }

      if (isError) return;

      const response = await HomeworkAPI.create(newHomework);

      router.push(`/teacher/homework/publish-homework/${response.data[0].id}`);
    } catch (error) {
      console.log("Error creating homework:", error);
    }
  };

  useEffect(() => {
    const fetchClassGroupData = async () => {
      const response = await ClassGroupAPI.getAll();

      if (response?.status !== 200) return;

      setClassGroups(response.data);
    };

    fetchClassGroupData();
  }, []);

  return (
    <div className="mx-auto max-w-[1000px] p-4 dark:text-slate-300">
      <Head>
        <title>Thêm bài tập</title>
      </Head>

      <h3 className="mb-2 text-sm font-semibold">TẠO BÀI TẬP MỚI</h3>
      <form onSubmit={handlePublish}>
        <div className="space-y-4 rounded-md bg-white p-5 shadow-md dark:bg-[rgb(var(--color-darkmode-600))]">
          <ConfigName values={newHomework} onChange={handleChangeTextInput} error={error} />
          <ConfigTime values={newHomework} onChange={handleChangeTextInput} error={error} />
          <ConfigContent
            values={newHomework}
            onChangeText={handleChangeTextInput}
            onChangeFile={handleChangeFileInput}
          />
          <ConfigFeature values={newHomework} onChange={handleChangeTextInput} />
          <ConfigAssignment
            classgroups={classGroups}
            values={newHomework}
            error={error}
            onChange={handleChangeTextInput}
          />
        </div>

        <Actions onPublish={handlePublish} />
      </form>
    </div>
  );
};

export default AddHomework;
