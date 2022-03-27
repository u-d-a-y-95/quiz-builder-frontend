import ErrorMessage from "../../../components/error";

const Option = ({
  option,
  question,
  optionIndex,
  data,
  setImageModal,
  setLink,
  questionIndex,
  validatyCheckAndSetData
}) => {
  return (
    <div>
      <div className="my-4">
        {option?.imgUrl?.map((url, urlIndex) => (
          <div className="my-4" key={urlIndex}>
            <span className="relative">
              <img src={url} alt="test" className="rounded" />
              <button
                style={{
                  left: "-14px",
                  top: "-14px",
                }}
                className="bg-gray-200 w-8 h-8 rounded-full absolute left-4 top-0"
                onClick={(e) => {
                  option.imgUrl?.splice(urlIndex, 1);
                  validatyCheckAndSetData()
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex items-center w-9/12">
          <input
            type="checkbox"
            className="w-6 h-6"
            checked={question.answers.includes(option.uniqueValue)}
            onChange={(e) => {
              if (question.probType === 1) {
                if (e.target.checked) {
                  question.answers = [];
                  question.answers.push(option.uniqueValue);
                }
              } else {
                if (
                  e.target.checked &&
                  !question.answers.includes(option.uniqueValue)
                ) {
                  question.answers.push(option.uniqueValue);
                } else if (
                  !e.target.checked &&
                  question.answers.includes(option.uniqueValue)
                ) {
                  question.answers.splice(
                    question.answers.indexOf(option.uniqueValue),
                    1
                  );
                }
              }
              option.isAnswer = e.target.checked;
              validatyCheckAndSetData()
            }}
          />
          <input
            className="border-b-2 outline-0 focus:border-blue-500 mx-2 w-full py-1"
            value={option.text}
            onChange={(e) => {
              option.text = e.target.value;
              validatyCheckAndSetData()
            }}
            placeholder="Enter option"
          />
        </div>
        
        <div className="w-3/12 text-right">
          <button
            className="bg-gray-200 w-8 h-8 rounded-full"
            type="button"
            onClick={(e) => {
              setImageModal({
                isOpen: true,
                item: option,
                saveBtn: (link) => {
                  link && option.imgUrl?.push(link);
                  validatyCheckAndSetData()
                  setLink("");
                  setImageModal({
                    isOpen: false,
                    item: null,
                    saveBtn: null,
                  });
                },
              });
            }}
          >
            <i className="fa fa-image"></i>
          </button>
          <button
            className="bg-gray-200 w-8 h-8 rounded-full ml-2"
            onClick={(e) => {
              question.answers.includes(option.uniqueValue) &&
                question.answers.splice(
                  question.answers.indexOf(option.uniqueValue),
                  1
                );
              question.predicts.includes(option.uniqueValue) &&
                question.predicts.splice(
                  question.predicts.indexOf(option.uniqueValue),
                  1
                );
              question?.options?.splice(optionIndex, 1);
              validatyCheckAndSetData()
            }}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
      </div>
      <ErrorMessage
          error={data?.error?.status?.questions[questionIndex]?.options[optionIndex]?.text}
        />
    </div>
  );
};

export default Option;
