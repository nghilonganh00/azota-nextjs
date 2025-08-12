"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ListQuestionPanel from "./components/listQuestionPanel";
import EditorCode from "./components/editorCode";
import convertToJSON from "./lib/util/formatExam";

const Editor = () => {
  const savedEditorValue = localStorage.getItem("exam") ?? "";
  const [editorValue, setEditorValue] = useState(savedEditorValue);
  const [examJSON, setExamJSON] = useState<{ [key: string]: any }>();
  console.log("examJSON: ", examJSON);
  const [goToLine, setGoToLine] = useState<number>(1);

  const handleGoToLine = (line: number) => {
    setGoToLine(line);
  };

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  //Covert text in the Editor from string to JSON
  const handleCovertEditorIntoJSON = () => {
    const covertedExamJSON = convertToJSON(editorValue);
    setExamJSON(covertedExamJSON);
    localStorage.setItem("exam", editorValue);
  };

  //After 1 seconds the user cannot edit in the EditorCode, the conversion function will be performed
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      handleCovertEditorIntoJSON();
    }, 1000);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [editorValue]);

  console.log("exam: ", examJSON);

  return (
    <div className="grid grid-cols-12">
      <Head>
        <title>Tạo bài thi</title>
      </Head>

      <ListQuestionPanel examJSON={examJSON} setExamJSON={setExamJSON} handleGoToLine={handleGoToLine} />

      <EditorCode value={editorValue} setValue={setEditorValue} goToLine={goToLine} />
    </div>
  );
};

export default Editor;
