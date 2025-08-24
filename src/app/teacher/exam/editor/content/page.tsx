"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ListQuestionPanel from "./components/listQuestionPanel";
import EditorCode from "./components/editorCode";
import convertToJSON from "./lib/util/formatExam";
import { ExamJSON } from "./lib/interface";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Editor = () => {
  const [editorValue, setEditorValue] = useState<string>("");
  const [examJSON, setExamJSON] = useState<ExamJSON>({} as ExamJSON);
  const [goToLine, setGoToLine] = useState<number>(1);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [savedEditorValue, setSavedEditorValue, ready] = useLocalStorage<string>("exam", "");

  const handleGoToLine = (line: number) => {
    setGoToLine(line);
  };

  useEffect(() => {
    if (ready) setEditorValue(savedEditorValue);
  }, [ready, savedEditorValue]);

  useEffect(() => {
    if (!ready) return;

    const updateAndSave = () => {
      const convertedExamJSON: ExamJSON = convertToJSON(editorValue);
      setExamJSON(convertedExamJSON);

      setSavedEditorValue(editorValue);
    };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(updateAndSave, 1000);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [editorValue]);

  if (!ready) return null;

  return (
    <div className="grid grid-cols-12">
      <Head>
        <title>Tạo bài thi</title>
      </Head>

      {examJSON && <ListQuestionPanel examJSON={examJSON} setExamJSON={setExamJSON} handleGoToLine={handleGoToLine} />}

      <EditorCode value={editorValue} setValue={setEditorValue} goToLine={goToLine} />
    </div>
  );
};

export default Editor;
