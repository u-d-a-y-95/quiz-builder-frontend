import { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "./components/modal";
function App() {
  const [imageModal,setImageModal] = useState({
    isOpen:false,
    item:null
  })
  const [data, setData] = useState({
    title: "Basic Maths",
    questions: [
      {
        order: 0,
        probType: 1,
        prob: {
          text: "",
          imgUrl: [
            "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg",
          ],
        },
        options: [
          {
            text: "option 1",
            imgUrl: [],
            isAnswer: false,
          },
          {
            text: "",
            imgUrl: [],
            isAnswer: true,
          },
        ],
        points: 5,
      },
      {
        order: 0,
        probType: 1,
        prob: {
          text: "",
          imgUrl: [],
        },
        options: [
          {
            text: "",
            imgUrl: [],
            isAnswer: true,
          },
        ],
        points: 5,
      },
    ],
  });
  return (
    <div className="flex">
      <div className="flex">
        <div className="p-16 w-500">
          <h3 className="text-center">{data?.title}</h3>
          {data?.questions?.map((question, questionIndex) => (
            <div className="shadow-lg p-12 my-8 border-2">
              <div>
                <div className="flex items-end">
                  <div className="w-9/12">
                    <input
                      className="w-full border-b-2 outline-0 focus:border-blue-500 py-1"
                      value={question.prob.text}
                      onChange={(e) => {
                        question.prob.text = e.target.valeu;
                        setData({
                          ...data,
                        });
                      }}
                    />
                  </div>
                  <button
                    className="bg-gray-200 w-8 h-8 rounded-full mx-1"
                    onClick={(e) => {
                      setImageModal({
                        isOpen:true,
                        item:question
                      })
                    }}
                  >
                    <i className="fa fa-image"></i>
                  </button>
                  <select
                    className="w-3/12 p-2"
                    value={question.probType}
                    onChange={(e) => {
                      question.probType = e.target.value;
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

              <div className="my-16">
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
                          checked={option.isAnswer}
                          onChange={(e) => {
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
                        />
                      </div>
                      <div className="w-3/12 text-right">
                        <button className="bg-gray-200 w-8 h-8 rounded-full ">
                          <i className="fa fa-image"></i>
                        </button>
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
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  className="text-blue-500 cursor-pointer mt-4"
                  onClick={(e) => {
                    question?.options?.push({
                      text: "",
                      imgUrl: [],
                      isAnswer: false,
                    });
                    setData({
                      ...data,
                    });
                  }}
                >
                  Add onther Options
                </div>
              </div>
              <div className="py-4">
                <div className="flex justify-between">
                  <input className="w-48 border-b-2 outline-0 focus:border-blue-500 py-1" />
                  <div>
                    <button className="bg-gray-200 w-8 h-8 rounded-full ">
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
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
                <div className="flex items-end">
                  <div className="w-9/12">
                    <input className="w-full border-b-2 outline-0 focus:border-blue-500 py-1" />
                  </div>
                  <button className="bg-gray-200 w-8 h-8 rounded-full mx-1">
                    <i className="fa fa-image"></i>
                  </button>
                  <select className="w-2/12 p-2">
                    <option>Single</option>
                    <option>Multiple</option>
                  </select>
                </div>
                <div className="my-4">
                  <img
                    src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
                    alt="test"
                  />
                </div>
              </div>

              <div className="my-16">
                <div>
                  <div className="my-4">
                    <img
                      src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
                      alt="test"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center w-8/12">
                      <input type="checkbox" className="w-6 h-6 " />
                      <input className="border-b-2 outline-0 focus:border-blue-500 mx-2 w-full py-1" />
                    </div>
                    <div className="w-2/12 text-right">
                      <button className="bg-gray-200 w-8 h-8 rounded-full">
                        <i className="fa fa-image"></i>
                      </button>
                      <button className="bg-gray-200 w-8 h-8 rounded-full ml-2">
                        <i className="fa fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-blue-500 cursor-pointer mt-4">
                  Add onther Options
                </div>
              </div>
              <div className="py-4">
                <div className="flex justify-between">
                  <input className="w-48 border-b-2 outline-0 focus:border-blue-500 py-1" />
                  <div>
                    <button className="bg-gray-200 w-8 h-8 rounded-full ">
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
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
                  isOpen:false,
                  item:null
                })
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
                  value={""}
                  onChange={(e) => {}}
                />
              </div>
              <button
                className="bg-sky-500 px-8 mx-4 rounded text-white"
                onClick={(e) => {
                  // imageModal.item.imgUrl.push()
                  setImageModal({
                    isOpen:false,
                    item:null
                  })
                }}
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
