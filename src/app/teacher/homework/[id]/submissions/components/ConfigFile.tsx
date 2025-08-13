import { IHomework, IHomeworkFile } from "@/interfaces";
import HomeworkFileAPI from "@/lib/api/homeworkFile";
import FirebaseStorage from "@/lib/firebaseStorage";
import { FileText, Upload, X } from "lucide-react";
import { useParams } from "next/navigation";

interface ConfigFileProps {
  homework: IHomework;
  setHomework: React.Dispatch<React.SetStateAction<IHomework>>;
}

const ConfigFile: React.FC<ConfigFileProps> = (props) => {
  const { homeworkId } = useParams();
  const { homework, setHomework } = props;
  const homworkFiles = homework.homeworkFiles;

  const handleAddFile = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const homeworkFiles = (e.target as HTMLInputElement).files;

    if (homeworkFiles && homeworkId) {
      const homeworkFileObjs = await Promise.all(
        Array.from(homeworkFiles)?.map(async (homeworkFile) => {
          const uploadFile = await FirebaseStorage.upload(homeworkFile);
          return {
            homeworkFileName: homeworkFile.name,
            homeworkFileLink: uploadFile.downloadURL,
          };
        })
      );

      await Promise.all(
        Array.from(homeworkFileObjs).map(async (homeworkFileObj) => {
          const response = await HomeworkFileAPI.add(
            homework.id,
            homeworkFileObj.homeworkFileName,
            homeworkFileObj.homeworkFileLink
          );

          if (response?.status === 201) {
            const newHomeworkFile: IHomeworkFile = response.data;

            setHomework((prevHomework) => ({
              ...prevHomework,
              homeworkFiles: [...prevHomework.homeworkFiles, newHomeworkFile],
            }));
          }
        })
      );
    }
  };

  const handleDeleteFile = async (id: number) => {
    const response = await HomeworkFileAPI.remove(id);

    if (response?.status !== 200) return;

    setHomework((prevHomework) => ({
      ...prevHomework,
      homeworkFiles: prevHomework.homeworkFiles.filter((homeworkFile) => homeworkFile.id !== id),
    }));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">File đính kèm</div>
        <label className="hover:bg-cy inline-flex items-center gap-2 rounded-md p-2 text-blue-800 hover:cursor-pointer dark:text-blue-600">
          <Upload strokeWidth={1.5} className="size-4" />
          <div className="text-xs font-semibold">Thêm File</div>
          <input type="file" className="hidden" multiple onChange={handleAddFile} />
        </label>
      </div>

      <div className="text-xs text-gray-600 dark:text-slate-300">
        Hỗ trợ file định dạng ảnh, pdf, word, excel, audio hoặc video
      </div>

      <div className="space-y-2">
        {homworkFiles?.map((homeworkFile) => (
          <div className="flex items-center justify-between" key={homeworkFile.id}>
            <a
              className="flex items-center gap-2 text-blue-900 dark:text-blue-600"
              href={homeworkFile.link}
              rel="noopener noreferrer"
              target="_blank"
              aria-label={`Delete file: ${homeworkFile.title}`}
            >
              <FileText strokeWidth={1.5} className="size-4" />
              <div className="text-xs">{homeworkFile.title}</div>
            </a>

            <div className="px-2 py-1 hover:cursor-pointer" onClick={() => handleDeleteFile(homeworkFile.id)}>
              <X className="size-4" strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigFile;
