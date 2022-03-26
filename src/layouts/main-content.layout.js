import { Outlet, Route, Routes } from "react-router-dom";
import QuizPage from "../pages/quiz";
import QuizForm from "../pages/quiz/form";

const MainContent = () => {
  return <div className="w-full mx-4 border-2 p-6">
      <Outlet/>
  </div>;
};

export default MainContent
