"use client";

import { IClassgroup, IClassroom, IStudentResult } from "@/interfaces";
import ExamResultAPI from "@/lib/api/examResult";
import { useEffect, useState } from "react";
import StudentResultList from "./StudentResultList";
import ClassGroupPopup from "./ClassGroupPopup";

interface AssignedByStudentProps {
  classGroups: IClassgroup[];
}

const AssignedByStudent: React.FC<AssignedByStudentProps> = (props) => {
  const { classGroups } = props;

  const examId = Number(sessionStorage.getItem("examId")) || null;

  const [showedClassGroup, setShowClassGroup] = useState<IClassgroup>({} as IClassgroup);
  const [showedClassroom, setShowClassroom] = useState<IClassroom | null>(null);
  const [studentResults, setStudentResults] = useState<IStudentResult[]>([]);

  useEffect(() => {
    if (classGroups?.length > 0) {
      setShowClassGroup(classGroups[0]);
      setShowClassroom(classGroups[0].classrooms[0]);
    }
  }, [classGroups]);

  useEffect(() => {
    const fetchResultListData = async () => {
      if (examId && showedClassroom) {
        const response = await ExamResultAPI.getAssignedByClassLatest(examId, showedClassroom.id);

        if (response && response.data) {
          const data = response.data as IStudentResult[];
          setStudentResults(data);
        } else {
          setStudentResults([]);
        }
      }
    };

    fetchResultListData();
  }, [examId, showedClassroom]);

  return (
    <div className="rounded-md border-gray-300 bg-white p-3 pb-28 shadow-sm">
      <ClassGroupPopup
        showedClassGroup={showedClassGroup}
        setShowClassGroup={setShowClassGroup}
        setShowClassroom={setShowClassroom}
        classGroups={classGroups}
      />

      <div className="flex items-center">
        {showedClassGroup.classrooms?.map((classroom) => {
          const submitedStudentTotal = studentResults.map(
            (studentResult) => studentResult.classId === classroom.id
          ).length;

          return (
            <div
              className={`w-[20%] border-b-2 py-3 text-center hover:cursor-pointer ${
                showedClassroom?.id === classroom.id && "border-blue-800"
              }`}
              key={classroom.id}
              onClick={() => setShowClassroom(classroom)}
            >
              <div className="text-sm font-medium">
                {`${classroom.className} ` +
                  (showedClassroom?.id === classroom.id ? `(${submitedStudentTotal}/${classroom.studentCount})` : "")}
              </div>
            </div>
          );
        })}
      </div>

      {showedClassroom && <StudentResultList studentResults={studentResults} />}
    </div>
  );
};

export default AssignedByStudent;
