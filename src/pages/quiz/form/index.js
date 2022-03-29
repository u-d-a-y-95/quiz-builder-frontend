import { useEffect, useState } from "react";
import Modal from "../../../components/modal";
import Choicebox from "../../../components/choicebox";
import { QUIZ } from "../../../utils/constant";
import { getLocalData, setLocalData } from "../../../utils/localStorage";
import Question from "./question";
import { validation } from "./validation";
import ErrorMessage from "../../../components/error";
import { useNavigate, useParams } from "react-router-dom";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

const QuizForm = () => {
  // "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
  const params = useParams();

  const navigate = useNavigate();
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    item: null,
  });
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    id: "",
  });
  const [link, setLink] = useState("");
  const [data, setData] = useState({
    title: "",
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
        options: [],
        point: 1,
        answers: [],
        predicts: [],
      },
    ],
  });

  useEffect(() => {
    if (params?.id) {
      const local = getLocalData(QUIZ);
      local.hasOwnProperty(params?.id) && setData(local[params?.id]);
    }
  }, [params]);

  const validatyCheckAndSetData = () => {
    data["error"] = validation(data);
    data["isSubmitBtnPressed"] = false;
    setData({
      ...data,
    });
  };
  return (
    <DragDropContext
      onDragEnd={(result) => {
        const a = data.questions[result?.source?.index];
        data.questions[result?.source?.index] =
          data?.questions[result?.destination?.index];
        data.questions[result?.destination?.index] = a;
        setData({
          ...data,
        });
      }}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-sky-500 text-2xl tracking-widest">
            create Quiz
          </h1>
          <div>
            <button
              type="button"
              className="bg-gray-300 px-6 py-1 text-white rounded mx-1"
              onClick={(e) => {
                navigate("/quiz");
              }}
            >
              back
            </button>
            <button
              type="button"
              className="bg-sky-500 px-6 py-1 text-white rounded mx-1"
              onClick={(e) => {
                data["error"] = validation(data);
                data["isSubmitBtnPressed"] = true;
                setData({
                  ...data,
                });
                if (data?.error?.valid) {
                  const local = getLocalData(QUIZ);
                  data.id = params?.id || new Date().getTime();
                  local[data.id] = data;
                  setLocalData(QUIZ, local);
                  setSuccessModal({
                    isOpen: true,
                    id: data.id,
                  });
                }
              }}
            >
              save
            </button>
          </div>
        </div>
        <div
          style={{
            height: "650px",
            overflow: "auto",
          }}
        >
          <div className="flex justify-between mt-4">
            <div className="flex">
              <div className="w-600">
                <div className="shadow-lg p-12 mb-4 border-2">
                  <input
                    className="border-b-2 outline-0 focus:border-blue-500 mx-2 w-full py-1"
                    value={data?.title}
                    onChange={(e) => {
                      data.title = e.target.value;
                      validatyCheckAndSetData();
                    }}
                    placeholder="Enter Title"
                  />
                  <ErrorMessage error={data?.error?.status.title} />
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
                        validatyCheckAndSetData();
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
                        validatyCheckAndSetData();
                      }}
                    />
                  </div>
                </div>

                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className={snapshot.isDraggingOver ? "bg-sky-100" : ""}
                      {...provided.droppableProps}
                    >
                      {data?.questions?.map((question, questionIndex) => (
                        <Draggable
                          draggableId={question?.name?.toString()}
                          index={questionIndex}
                          key={question?.name?.toString()}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="shadow-lg p-12 my-8 border-2 relative bg-white"
                              key={questionIndex}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided?.dragHandleProps}
                            >
                              <Question
                                question={question}
                                setData={setData}
                                data={data}
                                setImageModal={setImageModal}
                                questionIndex={questionIndex}
                                setLink={setLink}
                                validatyCheckAndSetData={
                                  validatyCheckAndSetData
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided?.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
            {/* <Preview data={data} setData={setData} /> */}
            <Modal open={imageModal.isOpen}>
              <div className="bg-white p-8 w-96  rounded">
                <div className="flex justify-between items-center border-b bg-sky-100 py-2">
                  <h3 className="h3 text-sky-500 font-bold px-2">Links</h3>
                  <button
                    className="hover:bg-gray-200 w-8 h-8 rounded-full"
                    onClick={(e) => {
                      setImageModal({
                        isOpen: false,
                        item: null,
                      });
                      setLink("");
                    }}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
                <div className="my-8">
                  {link && <img src={link} alt="url" className="rounded" />}

                  <div className="flex mt-4">
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
                      className="bg-sky-500 px-4 ml-4 rounded text-white"
                      onClick={(e) => imageModal.saveBtn(link)}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
            <Modal open={successModal?.isOpen}>
              <div className="bg-white w-96 h-60 rounded p-4 flex flex-col">
                <div className="border-b border-b-green-500 py-2 px-4 bg-green-100">
                  <h1 className="text-green-600 font-bold text-xl">Success</h1>
                </div>
                <div className="my-8 grow text-center">
                  <p className="font-bold">Successfull Saved</p>
                </div>
                <div className="border-t py-2 text-right">
                  <button
                    type="button"
                    className="bg-sky-500 px-4 py-1 mx-1 rounded text-white capitalize"
                    onClick={(e) => {
                      navigate(`/quiz/edit/${successModal?.id}`);
                      setSuccessModal({
                        isOpen: false,
                        id: null,
                      });
                    }}
                  >
                    edit again
                  </button>
                  <button
                    type="button"
                    className="bg-teal-500 px-4 py-1 mx-1 rounded text-white capitalize"
                    onClick={(e) => {
                      navigate("/quiz");
                      setSuccessModal({
                        isOpen: false,
                        id: null,
                      });
                    }}
                  >
                    goto quiz page
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default QuizForm;
