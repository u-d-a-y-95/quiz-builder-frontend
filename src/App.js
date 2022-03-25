import { useState } from "react";
import Modal from "./components/modal";
import Option from "./components/option";
function App() {
  // "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    item: null,
  });
  const [link, setLink] = useState("");
  const [data, setData] = useState({
    title: "Basic Maths",
    questions: [
      {
        order: 0,
        probType: 1,
        name: new Date().toString(),
        prob: {
          text: "",
          imgUrl: [],
        },
        options: [
          {
            text: "",
            imgUrl: [],
            isAnswer: false,
            uniqueValue: new Date().getTime(),
          },
        ],
        points: 5,
        answers: new Set(),
        predicts: new Set(),
      },
    ],
  });
  return (
    <div className="flex">
      <div className="flex">
        <div className="p-16 w-500">
          <h3 className="text-center">{data?.title}</h3>
          {data?.questions?.map((question, questionIndex) => (
            <div className="shadow-lg p-12 my-8 border-2 relative">
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
                      question.answers.clear();
                      question.predicts.clear();
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
                  {question?.prob?.imgUrl?.map(
                    (probImgUrl, probImgUrlIndex) => (
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
                    )
                  )}
                </div>
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
                    <div className="flex justify-between">
                      <div className="flex items-center w-9/12">
                        <input
                          type="checkbox"
                          className="w-6 h-6"
                          checked={question.answers.has(option.uniqueValue)}
                          onChange={(e) => {
                            if (question.probType === 1) {
                              if (e.target.checked) {
                                question.answers.clear();
                                question.answers.add(option.uniqueValue);
                              }
                            } else {
                              if (
                                e.target.checked &&
                                !question.answers.has(option.uniqueValue)
                              ) {
                                question.answers.add(option.uniqueValue);
                              } else if (
                                !e.target.checked &&
                                question.answers.has(option.uniqueValue)
                              ) {
                                question.answers.delete(option.uniqueValue);
                              }
                            }
                            option.isAnswer = e.target.checked;

                            setData({
                              ...data,
                            });
                          }}
                        />
                        <input
                          className="border-b-2 outline-0 focus:border-blue-500 mx-2 w-full py-1"
                          value={option.text}
                          onChange={(e) => {
                            option.text = e.target.value;
                            setData({
                              ...data,
                            });
                          }}
                          placeholder="Enter option"
                        />
                      </div>
                      <div className="w-3/12 text-right">
                        <button className="bg-gray-200 w-8 h-8 rounded-full ">
                          <i className="fa fa-image"></i>
                        </button>
                        <button
                          className="bg-gray-200 w-8 h-8 rounded-full ml-2"
                          onClick={(e) => {
                            question.answers.has(option.uniqueValue) &&
                              question.answers.delete(option.uniqueValue);
                            question.predicts.has(option.uniqueValue) &&
                              question.predicts.delete(option.uniqueValue);
                            question?.options?.splice(optionIndex, 1);
                            setData({
                              ...data,
                            });
                          }}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
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
                      name: new Date().toString(),
                      prob: {
                        text: "",
                        imgUrl: [],
                      },
                      options: [],
                      points: "",
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
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="p-16 w-500">
          <h3 className="text-center">{data?.title}</h3>
          {data?.questions?.map((question, questionIndex) => (
            <div className="shadow-lg p-12 my-8 border-2">
              <div>
                <div className="font-bold text-2xl">
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
                    {console.log(question)}
                    <Option
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
      </div>
      <Modal open={imageModal.isOpen}>
        <div className="bg-white p-10 w-1/3">
          <div className="flex justify-between items-center border-b">
            <h3 className="h3 text-sky-500 font-bold">Links</h3>
            <button
              className="hover:bg-gray-200 w-8 h-8 rounded-full"
              onClick={(e) => {
                setImageModal({
                  isOpen: false,
                  item: null,
                });
              }}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="my-8">
            <div className="flex">
              <div className="w-10/12">
                <input
                  className="w-full border-b-2 outline-0 focus:border-blue-500 py-1"
                  value={link}
                  onChange={(e) => {
                    setLink(e?.target?.value);
                  }}
                />
              </div>
              <button
                className="bg-sky-500 px-8 mx-4 rounded text-white"
                onClick={(e) => imageModal.saveBtn(link)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
