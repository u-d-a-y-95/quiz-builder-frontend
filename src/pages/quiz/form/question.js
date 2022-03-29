import Option from "./option";
import ErrorMessage from "../../../components/error";
import ToolTip from "../../../components/tooltip";
const Question = ({
  question,
  data,
  setImageModal,
  questionIndex,
  setLink,
  validatyCheckAndSetData,
}) => {
  return (
    <>
      <div>
        <div className="flex items-end">
          <div className="w-9/12">
            <input
              className="w-full border-b-2 outline-0 focus:border-blue-500 py-1"
              value={question.prob.text}
              onChange={(e) => {
                question.prob.text = e.target.value;
                validatyCheckAndSetData();
              }}
              placeholder="Enter Question"
            />
          </div>
          <button
            type="button"
            className="bg-gray-200 w-8 h-8 rounded-full mx-1"
            onClick={(e) => {
              setImageModal({
                isOpen: true,
                item: question,
                saveBtn: (link) => {
                  link && question?.prob?.imgUrl?.push(link);
                  validatyCheckAndSetData();
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
          <select
            className="w-3/12 p-2"
            value={question.probType}
            onChange={(e) => {
              question.probType = Number(e.target.value);
              question.answers = [];
              question.predicts = [];
              validatyCheckAndSetData();
            }}
          >
            <option value={1}>Single</option>
            <option value={2}>Multiple</option>
          </select>
        </div>
        <ErrorMessage
          error={data?.error?.status?.questions[questionIndex]?.prob?.text}
        />

        <div className="my-4">
          {question?.prob?.imgUrl?.map((probImgUrl, probImgUrlIndex) => (
            <div className="my-4" key={probImgUrlIndex}>
              <span className="relative">
                <img src={probImgUrl} alt="test" className="rounded" />
                <button
                  style={{
                    left: "-14px",
                    top: "-14px",
                  }}
                  className="bg-gray-200 w-8 h-8 rounded-full absolute left-4 top-0"
                  onClick={(e) => {
                    question?.prob?.imgUrl?.splice(probImgUrlIndex, 1);
                    validatyCheckAndSetData();
                  }}
                >
                  <i className="fa fa-times"></i>
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="my-8">
        {question?.options?.map((option, optionIndex) => (
          <Option
            key={optionIndex}
            option={option}
            question={question}
            optionIndex={optionIndex}
            validatyCheckAndSetData={validatyCheckAndSetData}
            data={data}
            setImageModal={setImageModal}
            setLink={setLink}
            questionIndex={questionIndex}
          />
        ))}

        <div className="mt-4">
          <span
            className="text-blue-500 cursor-pointer"
            onClick={(e) => {
              question?.options?.push({
                text: "",
                imgUrl: [],
                isAnswer: false,
                uniqueValue: new Date().getTime(),
              });
              validatyCheckAndSetData();
            }}
          >
            Add onther Options
          </span>
        </div>
        {data?.isSubmitBtnPressed &&
          (data?.error?.status?.questions[questionIndex]?.numberOfOption ||
            data?.error?.status?.questions[questionIndex]?.numberOfChecked) && (
            <div className="mt-4 border py-2 bg-red-100 flex flex-col border-red-500 px-2">
              <ErrorMessage
                error={
                  data?.error?.status?.questions[questionIndex]?.numberOfOption
                }
              />
              <ErrorMessage
                error={
                  data?.error?.status?.questions[questionIndex]?.numberOfChecked
                }
              />
            </div>
          )}
      </div>
      <div>
        <input
          className="w-48 border-b-2 outline-0 focus:border-blue-500 py-1"
          placeholder="Enter point"
          type="number"
          value={question?.point}
          onChange={(e) => {
            question.point = Number(e?.target?.value);
            validatyCheckAndSetData();
          }}
        />
        <br />
        <ErrorMessage
          error={data?.error?.status?.questions[questionIndex]?.point}
        />
      </div>
      <div
        className="absolute top-0 bg-gray-100 w-12 h-20 flex flex-col"
        style={{
          right: "-55px",
        }}
      >
        <span className="mt-2">
        <ToolTip tip="Add new question">
          <button
            className="w-full"
            onClick={(e) => {
              data?.questions?.splice(questionIndex + 1, 0, {
                order: questionIndex + 1,
                probType: 1,
                name: new Date().getTime(),
                isValid: 0,
                prob: {
                  text: "",
                  imgUrl: [],
                },
                options: [],
                point: 1,
                answers: [],
                predicts: [],
              });
              validatyCheckAndSetData();
            }}
          >
            <i className="fa fa-plus"></i>
          </button>
        </ToolTip>
        </span>
            

        {questionIndex > 0 && (
          <span className="mt-2">
          <ToolTip tip="Remove this question">
          <button
            className="w-full"
            onClick={(e) => {
              data?.questions?.splice(questionIndex, 1);
              data["isSubmitBtnPressed"] = false;
              validatyCheckAndSetData();
            }}
          >
            <i className="fa fa-minus"></i>
          </button>
          </ToolTip>
          </span>


        )}
      </div>
    </>
  );
};

export default Question;
