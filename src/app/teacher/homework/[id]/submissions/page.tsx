"use client";
import { IHomework } from "@/interfaces";
import HomeworkAPI from "@/lib/api/homework";
import { StudentClassroomAPI } from "@/lib/api/studentClass";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StudentClassWithSubmissions } from "./libs/interface";
import SearchBar from "./components/Searchbar";
import ConfigArea from "./components/ConfigArea";
import ListResultArea from "./components/ListResultArea";

export default function HomeworkSubmissions() {
  const { id: homeworkId } = useParams<{ id: string }>();
  const [submissions, setSubmissions] = useState<StudentClassWithSubmissions[] | null>(null);
  const [search, setSearch] = useState<string>("");

  const [homework, setHomework] = useState<IHomework>({} as IHomework);

  const fetchHomework = async () => {
    if (!homeworkId) return;

    HomeworkAPI.getDetail(homeworkId).then((response) => {
      setHomework(response.data);
    });
  };

  const fetchSubmissions = async () => {
    if (!homeworkId) return;

    const response = await StudentClassroomAPI.getSubmissionsByHomeworkId(homeworkId);
    if (response?.status === 200) {
      setSubmissions(response.data);
    }
  };

  useEffect(() => {
    fetchHomework();
    fetchSubmissions();
  }, []);

  return (
    <div className="p-5">
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-3">{homework && <ConfigArea homework={homework} setHomework={setHomework} />}</div>

        <div className="col-span-7 h-96">
          <SearchBar search={search} setSearch={setSearch} />

          {submissions && <ListResultArea classroom={homework.classroom} students={submissions} search={search} />}
        </div>
      </div>
    </div>
  );
}
