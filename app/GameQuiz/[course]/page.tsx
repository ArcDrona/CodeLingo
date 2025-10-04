"use client";
import React from "react";
import QuizScreen from "../../../GameQuiz/QuizScreen";

const QuizDynamicPage = ({ params }: { params: Promise<{ course: string }> }) => {
  const { course } = React.use(params);
  return <QuizScreen course={decodeURIComponent(course)} />;
};

export default QuizDynamicPage;
