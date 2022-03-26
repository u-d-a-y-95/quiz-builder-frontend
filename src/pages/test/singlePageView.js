import Choicebox from "../../components/choicebox";

const SinglePageView = ({ quiz, setQuiz,submitBtn }) => {
  return (
    <div className="flex justify-center">
      {
        console.log(quiz)
      }
      <div className="w-500">
        <div className="shadow-lg p-12 mb-4 border-2">
          <h1 className="text-2xl font-bold py-2">{quiz?.title}</h1>
          <p>Questions : {quiz?.questions?.length}</p>
          <p>Total : </p>
        </div>
        {quiz?.questions?.map((question, questionIndex) => (
          <div className="shadow-lg p-12 my-8 border-2" key={questionIndex}>
            <div>
              <div className="font-bold text-lg">
                <p>{question?.prob?.text}</p>
              </div>
              {question?.prob?.imgUrl &&
                question?.prob?.imgUrl?.map(
                  (probImageUrl, probImageUrlIndex) => (
                    <div className="my-4">
                      <img src={probImageUrl} alt="test" />
                    </div>
                  )
                )}
            </div>

            <div className="mt-8">
              {question?.options?.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <div className="my-4">
                    {option?.imgUrl?.map((url, urlIndex) => (
                      <img key={urlIndex} src={url} alt="test" />
                    ))}
                  </div>
                  <Choicebox
                    className="w-5"
                    name={question?.name}
                    id={question.name + optionIndex}
                    value={option?.uniqueValue}
                    label={option?.text}
                    checked={question?.predicts?.includes(option?.uniqueValue)}
                    type={question?.probType === 1 ? "radio" : "checkbox"}
                    onChange={(e) => {
                      if (question.probType === 1) {
                        if (e.target.checked) {
                          question.predicts = [];
                          question.predicts.push(option.uniqueValue);
                        }
                      } else {
                        if (
                          e.target.checked &&
                          !question?.predicts?.includes(option.uniqueValue)
                        ) {
                          question.predicts.push(option.uniqueValue);
                        } else if (
                          !e.target.checked &&
                          question?.predicts?.includes(option.uniqueValue)
                        ) {
                          question.predicts.splice(
                            question.predicts.indexOf(option.uniqueValue),
                            1
                          );
                        }
                      }
                      setQuiz({
                        ...quiz,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="shadow-lg p-12 mb-4 border-2 text-right">
          <button
            type="button"
            className="px-4 py-1 rounded bg-green-500 text-white"
            onClick={submitBtn}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePageView;
