import Option from "./option";

const Question = ({
  question,
  setData,
  data,
  setImageModal,
  questionIndex,
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
                setData({
                  ...data,
                });
              }}
              placeholder="Enter Question"
            />
          </div>
          <button
            className="bg-gray-200 w-8 h-8 rounded-full mx-1"
            onClick={(e) => {
              setImageModal({
                isOpen: true,
                item: question,
                saveBtn: (link) => {
                  question?.prob?.imgUrl?.push(link);
                  setData({
                    ...data,
                  });
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
              setData({
                ...data,
              });
            }}
          >
            <option value={1}>Single</option>
            <option value={2}>Multiple</option>
          </select>
        </div>
        <div className="my-4">
          {question?.prob?.imgUrl?.map((probImgUrl, probImgUrlIndex) => (
            <span className="relative">
              <img src={probImgUrl} alt="test" />
              <button
                style={{
                  left: "-14px",
                  top: "-14px",
                }}
                className="bg-gray-200 w-8 h-8 rounded-full absolute left-4 top-0"
                onClick={(e) => {
                  question?.prob?.imgUrl?.splice(probImgUrlIndex, 1);
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
      </div>
      <div className="my-8">
        {question?.options?.map((option, optionIndex) => (
          <Option
            key={optionIndex}
            option={option}
            question={question}
            optionIndex={optionIndex}
            setData={setData}
            data={data}
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
              setData({
                ...data,
              });
            }}
          >
            Add onther Options
          </span>
        </div>
      </div>
      <div>
        <input
          className="w-48 border-b-2 outline-0 focus:border-blue-500 py-1"
          placeholder="Enter point"
          type="number"
          value={question?.point}
          onChange={e=>{
              question.point = Number(e?.target?.value)
              setData({
                  ...data
              })
          }}
        />
      </div>
      <div
        className="absolute top-0 bg-gray-100 w-12 h-20 flex flex-col"
        style={{
          right: "-55px",
        }}
      >
        <button
          className="mt-2"
          onClick={(e) => {
            data?.questions?.splice(questionIndex + 1, 0, {
              order: questionIndex + 1,
              probType: 1,
              name: new Date().getTime(),
              prob: {
                text: "",
                imgUrl: [],
              },
              options: [],
              point: 1,
              answers: [],
              predicts: [],
            });
            setData({
              ...data,
            });
          }}
        >
          <i className="fa fa-plus"></i>
        </button>
        {questionIndex > 0 && (
          <button
            className="mt-2"
            onClick={(e) => {
              data?.questions?.splice(questionIndex, 1);
              setData({
                ...data,
              });
            }}
          >
            <i className="fa fa-minus"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default Question