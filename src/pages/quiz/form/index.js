import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Modal from "../../../components/modal";
import Choicebox from "../../../components/choicebox";
import { QUIZ } from "../../../utils/constant";
import { getLocalData, setLocalData } from "../../../utils/localStorage";
import Option from "./option";
import Preview from "./previw";
import Question from "./question";

const QuizForm = () => {
  // "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"

  const [imageModal, setImageModal] = useState({
    isOpen: false,
    item: null,
  });
  const [link, setLink] = useState("");
  const [data, setData] = useState({
    title: "Basic Maths",
    display: 1,
    questions: [
      {
        order: 0,
        probType: 1,
        name: new Date().getTime(),
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
        point: 5,
        answers: [],
        predicts: [],
      },
    ],
  });
  return (
    <div className="flex flex-col">
      {console.log(data)}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-sky-500 text-2xl tracking-widest">
          create Quiz
        </h1>
        <button
          type="button"
          className="bg-sky-500 px-6 py-2 text-white rounded"
          onClick={(e) => {
            const local = getLocalData(QUIZ);
            data.id = new Date().getTime();
            local[data.id] = data;
            setLocalData(QUIZ, local);
          }}
        >
          save
        </button>
      </div>
      <div
        style={{
          height: "650px",
          overflow: "auto",
        }}
      >
        <div className="flex  justify-between">
          <div className="flex">
            <div className="w-500">
              <div className="shadow-lg p-12 mb-4 border-2">
                <input
                  className="border-b-2 outline-0 focus:border-blue-500 mx-2 w-full py-1"
                  value={data?.title}
                  onChange={(e) => {
                    data.title = e.target.value;
                    setData({
                      ...data,
                    });
                  }}
                  placeholder="Enter Title"
                />
                <div className="flex mt-4 gap-4">
                  <Choicebox
                    id="display1"
                    type="radio"
                    name="display"
                    value="1"
                    checked={data?.display === 1}
                    label="Single Page"
                    onChange={(e) => {
                      data.display = Number(e?.target?.value);
                      setData({
                        ...data,
                      });
                    }}
                  />
                  <Choicebox
                    id="display2"
                    type="radio"
                    name="display"
                    value="2"
                    checked={data?.display === 2}
                    label="Multiple Page"
                    onChange={(e) => {
                      data.display = Number(e?.target?.value);
                      setData({
                        ...data,
                      });
                    }}
                  />
                </div>
              </div>
              {data?.questions?.map((question, questionIndex) => (
                <div
                  className="shadow-lg p-12 my-8 border-2 relative"
                  key={questionIndex}
                >
                  <Question
                    question={question}
                    setData={setData}
                    data={data}
                    setImageModal={setImageModal}
                    questionIndex={questionIndex}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* <Preview data={data} setData={setData} /> */}
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
      </div>
    </div>
  );
};

export default QuizForm;
