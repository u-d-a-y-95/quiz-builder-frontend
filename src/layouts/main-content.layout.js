import { Route, Routes } from "react-router-dom";
import QuizPage from "../pages/quiz";

const MainContent = () => {
  return <div className="w-full mx-4 border-2">
      <Routes>
          <Route
            path="quiz"
            element={<QuizPage/>}
          />
      </Routes>
  </div>;
};

export default MainContent
