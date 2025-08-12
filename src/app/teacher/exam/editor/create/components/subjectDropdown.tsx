"use client";

import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { Tab } from "@/interfaces";
import SubjectAPI from "@/lib/api/subject";
import Dropdown from "@/components/Dropdown/dropdown";

export interface ConfigDropdownProps {
  selectedGradeId?: string | null;
  selectedValue: Tab | null;
  setSelectValue: React.Dispatch<React.SetStateAction<Tab | null>>;
}

const SubjectDropdown: React.FC<ConfigDropdownProps> = (props) => {
  const { selectedGradeId, selectedValue, setSelectValue } = props;
  const [subjects, setSubjects] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchSubject = async () => {
      if (!selectedGradeId) return;

      const response: AxiosResponse | null = await SubjectAPI.getByGradeId(selectedGradeId);

      const subjectTabs: Tab[] = response?.data.map((subject: any) => ({
        name: subject.subjectName,
        value: subject.id,
      }));

      setSubjects(subjectTabs);
    };

    fetchSubject();
  }, [selectedGradeId]);

  return (
    <div className="col-span-6">
      <span className="mb-2 flex text-sm font-medium">Môn học</span>
      <Dropdown
        title="---Chọn môn học---"
        options={subjects}
        selectedValue={selectedValue}
        setSelectedValue={setSelectValue}
      />
    </div>
  );
};

export default SubjectDropdown;
