import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RouteWrapper from "./components/routeWrapper";
import BaseLayout from "./layouts/base.layout";
const NotFoundPage = React.lazy(() => import("./components/notFoundpage"));
const ProfilePage = React.lazy(() => import("./pages/profile"));
const QuizPage = React.lazy(() => import("./pages/quiz"));
const QuizForm = React.lazy(() => import("./pages/quiz/form"));
const TestPage = React.lazy(() => import("./pages/test"));
const UsersPage = React.lazy(() => import("./pages/users"));

function App() {
  return (
    <Routes>
      <Route path="" element={<BaseLayout />}>
        <Route path="" element={<Navigate to="quiz" replace={true} />} />
        <Route
          path="quiz/edit/:id"
          element={
            <RouteWrapper>
              <QuizForm />
            </RouteWrapper>
          }
        />
        <Route
          path="quiz/add"
          element={
            <RouteWrapper>
              <QuizForm />
            </RouteWrapper>
          }
        />
        <Route
          path="quiz"
          element={
            <RouteWrapper>
              <QuizPage />
            </RouteWrapper>
          }
        />
        <Route
          path="users"
          element={
            <RouteWrapper>
              <UsersPage />
            </RouteWrapper>
          }
        />
        <Route
          path="profile"
          element={
            <RouteWrapper>
              <ProfilePage />
            </RouteWrapper>
          }
        />
        <Route
          path="*"
          element={
            <RouteWrapper>
              <NotFoundPage />
            </RouteWrapper>
          }
        />
      </Route>
      <Route
        path="view/:id"
        element={
          <RouteWrapper>
            <TestPage />
          </RouteWrapper>
        }
      />
    </Routes>
  );
}

export default App;
