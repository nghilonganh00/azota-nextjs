"use client";

import { IClassgroup } from "@/interfaces";
import ClassGroupAPI from "@/lib/api/classgroup";
import Head from "next/head";
import { useEffect, useState } from "react";
import ClassActions from "./components/ClassActions";
import ClassList from "./components/ClassList";

const ClassManage = () => {
  const [classGroupList, setClassGroupList] = useState<IClassgroup[]>([]);

  useEffect(() => {
    const fetchClassGroups = async () => {
      const response = await ClassGroupAPI.getAll();

      if (response?.status !== 200) return;

      setClassGroupList(response.data);
    };

    fetchClassGroups();
  }, []);

  return (
    <div className="space-y-4 p-6 dark:text-slate-200">
      <Head>
        <title>Quản lý lớp học</title>
      </Head>

      <ClassActions classGroupList={classGroupList} setClassGroupList={setClassGroupList} />

      <ClassList classGroupList={classGroupList} />
    </div>
  );
};

export default ClassManage;
