import Toggle from "@/components/Toggle/Toggle";
import { IExam } from "@/interfaces";
import { useState, useEffect } from "react";

interface ConfigMixedProp {
  examConfig: IExam;
  setExamConfig: React.Dispatch<React.SetStateAction<IExam>>;
  handleChangeConfig: (name: string, newValue: string) => void;
}

const ConfigMixed: React.FC<ConfigMixedProp> = (props) => {
  const { examConfig, setExamConfig } = props;
  const { isRandomQuestion, isHideGroupQuestionTitle, isSectionsStartingFromQuestion1 } = examConfig;

  const [openRandomQuestion, setOpenRandomQuestion] = useState(isRandomQuestion);
  const [openHideGroupQuestionTitle, setOpenHideGroupQuestionTitle] = useState(isHideGroupQuestionTitle);
  const [openSectionsStartingFromQuestion1, setOpenSectionsStartingFromQuestion1] = useState(
    isSectionsStartingFromQuestion1
  );

  useEffect(() => {
    setExamConfig((preValue) => ({
      ...preValue,
      isRandomQuestion: openRandomQuestion,
      isHideGroupQuestionTitle: openHideGroupQuestionTitle,
      isSectionsStartingFromQuestion1: openSectionsStartingFromQuestion1,
    }));
  }, [openRandomQuestion, openHideGroupQuestionTitle, openSectionsStartingFromQuestion1, setExamConfig]);

  return (
    <div className="rounded-md bg-white px-5 py-6 text-gray-800 shadow dark:bg-darkmode-600 dark:text-slate-300">
      <div className="border-b border-gray-200 pb-4 text-base font-medium dark:border-darkmode-400">
        Đảo câu hỏi và đáp án
      </div>

      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-12">
          <div className="col-span-10 lg:col-span-5">
            <div className="font-medium">Đảo câu hỏi và đáp án</div>
            <div className="mt-2 pr-2 text-xs/5 text-slate-500 dark:text-slate-400">
              Hệ thống sẽ tự động đảo các câu hỏi và thứ tự đáp án trong mỗi câu hỏi trong mỗi lần học sinh truy cập làm
              bài. Trường hợp đề có phân nhóm, hệ thống sẽ đảo thứ tự câu hỏi trong phạm vi nhóm, không đảo vị trí các
              nhóm. <span className="font-medium text-blue-800">Tìm hiểu thêm</span>
            </div>
          </div>
          <div className="col-span-2">
            <Toggle isOpen={openRandomQuestion} setOpen={setOpenRandomQuestion} />
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-10 lg:col-span-5">
            <div>
              <div className="font-medium">Ẩn tiêu đề câu hỏi nhóm</div>
              <div className="mt-2 text-xs/5 text-slate-500 dark:text-slate-400">
                Hệ thống sẽ ẩn toàn bộ tiêu đề nhóm có trong đề thi khi học sinh thi Online hoặc khi giáo viên tải xuống
                đề thi
              </div>
            </div>
          </div>
          <div className="col-span-2">
            {<Toggle isOpen={openHideGroupQuestionTitle} setOpen={setOpenHideGroupQuestionTitle} />}
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-10 lg:col-span-5">
            <div>
              <div className="font-medium">Các phần bắt đầu từ câu 1</div>
            </div>
          </div>
          <div className="col-span-2">
            <Toggle isOpen={openSectionsStartingFromQuestion1} setOpen={setOpenSectionsStartingFromQuestion1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigMixed;
