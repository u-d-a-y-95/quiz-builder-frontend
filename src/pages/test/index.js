import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../components/modal";
import NotFoundPage from "../../components/notFoundpage";
import { QUIZ } from "../../utils/constant";
import { getLocalData } from "../../utils/localStorage";
import MultiplePageView from "./multiplePageView";
import ScoreView from "./score";
import SinglePageView from "./singlePageView";

const TestPage = ({}) => {
  const [pageNo, setPageNo] = useState(0);
  const params = useParams();
  const [quiz, setQuiz] = useState({});
  const [scoreModal, setScoreModal] = useState({
    isOpen: false,
    score: "",
  });
  useEffect(() => {
    const local = getLocalData(QUIZ);
    local.hasOwnProperty(params?.id) && setQuiz(local[params?.id]);
  }, []);
  const submitBtn = () => {
    const obj = quiz?.questions?.reduce(
      (acc, item) => {
        acc["point"] += item.point;
        if (item?.probType === 1) {
          if (item.answers[0] === item?.predicts[0]) {
            acc["rightPoint"] += item?.point;
            acc["rightAnswer"] += 1;
          } else {
            acc["wrongPoint"] += item?.point;
          }
        } else {
          if (
            item.answers.length === item?.predicts?.length &&
            item?.predicts?.every((a) => item?.answers?.includes(a))
          ) {
            acc["rightPoint"] += item?.point;
            acc["rightAnswer"] += 1;
          } else {
            acc["wrongPoint"] += item?.point;
          }
        }
        return acc;
      },
      {
        point: 0,
        rightPoint: 0,
        aquiredPoint: 0,
        rightAnswer: 0,
        wrongPoint: 0,
      }
    );
    obj["title"] = quiz?.title;
    obj["totalQuestion"] = quiz?.questions?.length;
    setScoreModal({
      isOpen: true,
      score: obj,
    });
  };

  const reset = () => {
    const local = getLocalData(QUIZ);
    local.hasOwnProperty(params?.id) && setQuiz(local[params?.id]);
    setScoreModal({
      isOpen: false,
      score: "",
    });
    setPageNo(0)
  };

  return (
    <>
      {quiz?.id ? (
        <>
          {quiz?.display === 1 ? (
            <SinglePageView
              quiz={quiz}
              setQuiz={setQuiz}
              submitBtn={submitBtn}
            />
          ) : (
            <MultiplePageView
              quiz={quiz}
              setQuiz={setQuiz}
              submitBtn={submitBtn}
              pageNo={pageNo}
              setPageNo={setPageNo}
            />
          )}
          <Modal open={scoreModal.isOpen}>
            <ScoreView score={scoreModal.score} reset={reset} />
          </Modal>
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default TestPage;
