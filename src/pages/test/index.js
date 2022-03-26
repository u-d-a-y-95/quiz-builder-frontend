import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QUIZ } from "../../utils/constant";
import { getLocalData } from "../../utils/localStorage";
import MultiplePageView from "./multiplePageView";
import SinglePageView from "./singlePageView";

const TestPage = ({}) => {
  const params = useParams();
  const [quiz, setQuiz] = useState({});
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
    console.log(obj);
  };

  return quiz?.display === 1 ? (
    <SinglePageView quiz={quiz} setQuiz={setQuiz} submitBtn={submitBtn} />
  ) : (
    <MultiplePageView quiz={quiz} setQuiz={setQuiz} submitBtn={submitBtn} />
  );
};

export default TestPage;
