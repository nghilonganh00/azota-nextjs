import Dropdown from "@/components/Dropdown/dropdown";
import { IGrade, IPurpose, ISubject, Tab } from "@/interfaces";
import GradeAPI from "@/lib/api/grade";
import PurposeAPI from "@/lib/api/purpose";
import SubjectAPI from "@/lib/api/subject";
import { useEffect, useState } from "react";

interface CategoryFromProps {
  gradeId: number;
  subjectId: number;
  purposeId: number;
  handleChangeConfig: (name: string, newValue: string | number | null) => void;
}

export const CategoryForm: React.FC<CategoryFromProps> = (props) => {
  const { gradeId, subjectId, purposeId, handleChangeConfig } = props;

  const [selectedGrade, setSelectedGrade] = useState<Tab | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Tab | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<Tab | null>(null);
  const [grades, setGrades] = useState<Tab[] | null>(null);
  const [subjects, setSubjects] = useState<Tab[] | null>(null);
  const [purposes, setPurposes] = useState<Tab[] | null>(null);

  useEffect(() => {
    const fetchGradePurposeData = async () => {
      const [gradeRes, purposeRes] = await Promise.all([GradeAPI.getAll(), PurposeAPI.getAll()]);
      const [subjectRes] = await Promise.all([SubjectAPI.getByGradeId(gradeId)]);

      if (gradeRes?.status === 200) {
        const gradesData: Tab[] = gradeRes.data.map((grade: IGrade) => ({ name: grade.name, value: grade.id }));
        setGrades(gradesData);

        const preSelectdGrade = gradesData.find((grade) => grade.value === gradeId) || null;
        setSelectedGrade(preSelectdGrade);
      }

      if (subjectRes?.status === 200) {
        const subjectsData: Tab[] = subjectRes.data.map((subject: ISubject) => ({
          name: subject.subjectName,
          value: subject.id,
        }));
        setSubjects(subjectsData);

        const preSelectdSubject = subjectsData.find((subject) => subject.value === subjectId) || null;
        setSelectedSubject(preSelectdSubject);
      }

      if (purposeRes?.status === 200) {
        const purposesData: Tab[] = purposeRes.data.map((purpose: IPurpose) => ({
          name: purpose.title,
          value: purpose.id,
        }));
        setPurposes(purposesData);

        const preSelectdPurpose = purposesData.find((purpose) => purpose.value === purposeId) || null;
        setSelectedPurpose(preSelectdPurpose);
      }
    };

    fetchGradePurposeData();
  }, [gradeId, purposeId, subjectId]);

  useEffect(() => {
    const fetchSubjectData = async () => {
      if (!selectedGrade?.value) return;

      const response = await SubjectAPI.getByGradeId(selectedGrade.value);
      if (response?.status === 200) {
        const subjectsData: Tab[] = response.data.map((subject: ISubject) => ({
          name: subject.subjectName,
          value: subject.id,
        }));
        setSubjects(subjectsData);

        if (gradeId !== selectedGrade.value) {
          handleChangeConfig("subjectId", null);
        }

        const preSelectdSubject = subjectsData.find((subject) => subject.value === subjectId) || null;
        setSelectedSubject(preSelectdSubject);
      }
    };

    fetchSubjectData();
  }, [selectedGrade, gradeId, subjectId]);

  useEffect(() => {
    if (selectedGrade) handleChangeConfig("gradeId", selectedGrade.value || null);
    if (selectedSubject) handleChangeConfig("subjectId", selectedSubject.value || null);
    if (selectedPurpose) handleChangeConfig("purposeId", selectedPurpose.value || null);
  }, [selectedGrade, selectedSubject, selectedPurpose]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <span className="mb-2 flex text-sm font-medium">Khối học</span>

        <Dropdown
          options={grades}
          selectedValue={selectedGrade}
          setSelectedValue={setSelectedGrade}
          title="--Chọn khối--"
        />
      </div>

      <div className="col-span-6">
        <span className="mb-2 flex text-sm font-medium">Môn học</span>

        <Dropdown
          options={subjects}
          selectedValue={selectedSubject}
          setSelectedValue={setSelectedSubject}
          title="--Chọn môn--"
        />
      </div>

      <div className="col-span-12">
        <span className="mb-2 text-sm font-medium">Mục đích tạo đề</span>

        <Dropdown
          options={purposes}
          selectedValue={selectedPurpose}
          setSelectedValue={setSelectedPurpose}
          title="--Chọn mục đich--"
        />
      </div>
    </div>
  );
};
