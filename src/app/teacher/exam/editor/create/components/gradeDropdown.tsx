"use client";

import Dropdown from "@/components/Dropdown/dropdown";
import { IGrade } from "@/interfaces";
import GradeAPI from "@/lib/api/grade";
import { useEffect, useState } from "react";

type Tab = { name: string; value: string };

interface GradeDropdownProps {
  selectedGrade: Tab | null;
  setSelectedGrade: React.Dispatch<React.SetStateAction<Tab | null>>;
}

const GradeDropdown: React.FC<GradeDropdownProps> = (props) => {
  const { selectedGrade, setSelectedGrade } = props;
  const [grades, setGrades] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchGrade = async () => {
      const respone = await GradeAPI.getAll();
      const grades: IGrade[] = respone?.data || [];
      const gradeTabs = grades?.map((grade: any) => ({
        name: grade.name,
        value: grade.id,
      }));

      setGrades(gradeTabs);
    };

    fetchGrade();
  }, []);

  console.log(grades);

  return (
    <div className="col-span-6">
      <span className="mb-2 flex text-sm font-medium">Khối học</span>
      <Dropdown
        title="---Chọn khối---"
        options={grades}
        selectedValue={selectedGrade}
        setSelectedValue={setSelectedGrade}
      />
    </div>
  );
};

export default GradeDropdown;
