import { Route, Routes } from "react-router-dom";
import BaseLayout from "./layouts/base.layout";
import QuizPage from "./pages/quiz";
import QuizForm from "./pages/quiz/form";
import TestPage from "./pages/test";

function App() {
  return (
    <Routes>
      <Route path="" element={<BaseLayout />}>
        <Route path="quiz/add" element={<QuizForm />} />
        <Route path="quiz" element={<QuizPage />} />
      </Route>
      <Route path="test/:id" element={<TestPage />} />
    </Routes>
  );
}

export default App;
