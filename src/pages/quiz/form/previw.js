import Choicebox from "../../../components/choicebox";

const Preview = ({ data, setData }) => {
  return (
    <div className="w-600">
      <div className="shadow-lg p-12 mb-4 border-2">
        <h1 className="text-sm font-bold">{data?.title}</h1>
      </div>
      {data?.questions?.map((question, questionIndex) => (
        <div className="shadow-lg p-12 my-8 border-2">
          <div>
            <div className="font-bold text-2xl">
              <p>{question?.prob?.text}</p>
            </div>
            {question?.prob?.imgUrl &&
              question?.prob?.imgUrl?.map((probImageUrl, probImageUrlIndex) => (
                <div className="my-4">
                  <img src={probImageUrl} alt="test" />
                </div>
              ))}
          </div>

          <div className="my-8">
            {question?.options?.map((option, optionIndex) => (
              <div>
                <div className="my-4">
                  {option?.imgUrl?.map((url, urlIndex) => (
                    <span>
                      <img src={url} alt="test" />
                      <button
                        className="bg-gray-200 w-8 h-8 rounded-full ml-2"
                        onClick={(e) => {
                          question?.options?.splice(optionIndex, 1);
                          setData({
                            ...data,
                          });
                        }}
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </span>
                  ))}
                </div>
                <Choicebox
                  name={question?.name}
                  id={question.name + optionIndex}
                  option={option?.text}
                  checked={question?.predicts?.has(option.uniqueValue)}
                  type={question?.probType === 1 ? "radio" : "checkbox"}
                  onChange={(e) => {
                    if (question.probType === 1) {
                      if (e.target.checked) {
                        question.predicts.clear();
                        question.predicts.add(option.uniqueValue);
                      }
                    } else {
                      if (
                        e.target.checked &&
                        !question.predicts.has(option.uniqueValue)
                      ) {
                        question.predicts.add(option.uniqueValue);
                      } else if (
                        !e.target.checked &&
                        question.predicts.has(option.uniqueValue)
                      ) {
                        question.predicts.delete(option.uniqueValue);
                      }
                    }
                    setData({
                      ...data,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Preview;
