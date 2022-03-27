import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal";
import ToolTip from "../../components/tooltip";
import { QUIZ } from "../../utils/constant";
import { getLocalData, setLocalData } from "../../utils/localStorage";

const QuizPage = () => {
  const navigate = useNavigate();
  const [landing, setLanding] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    item: null,
  });

  useEffect(() => {
    const local = getLocalData(QUIZ);
    const data = Object.values(local);
    setData(data);
  }, []);
  const headers = [
    "#",
    "Title",
    "Type",
    "Questions",
    "Total Points",
    "Actions",
  ];
  const setData = (data) => {
    setLanding(
      data?.map((item) => ({
        id: item?.id,
        title: item?.title,
        type: item?.display === 1 ? "Single Page" : "Question Per Page",
        questions: item?.questions?.length,
        totalPoint: item?.questions?.reduce(
          (acc, question) => acc + +question?.point,
          0
        ),
      }))
    );
  };
  const deleteQuiz = (id) => {
    const local = getLocalData(QUIZ);
    delete local[id];
    const data = Object.values(local);
    setLocalData(QUIZ, local);
    setData(data);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-sky-500 text-2xl tracking-widest">
          Quiz
        </h1>
        <button
          type="button"
          className="bg-sky-500 px-6 py-1 text-white rounded"
          onClick={(e) => {
            navigate("./add");
          }}
        >
          create
        </button>
      </div>
      <div className="mt-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              {headers?.map((header, index) => (
                <td
                  key={index}
                  className="border text-sm text-center py-2 text-gray-500"
                >
                  {header}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {landing?.map((item, index) => (
              <tr key={item?.id}>
                <td className="border text-sm py-2 text-center w-8">
                  {index + 1}
                </td>
                <td className="border text-sm py text-center">{item?.title}</td>
                <td className="border text-sm py text-center">{item?.type}</td>
                <td className="border text-sm py text-center">
                  {item?.questions}
                </td>
                <td className="border text-sm py text-center">
                  {item?.totalPoint}
                </td>
                <td className="border text-sm py text-center">
                  <ToolTip tip="view">
                    <span className="rounded p-1  mx-1 hover:bg-gray-100 hover:text-sky-600 hover:cursor-pointer">
                      <i className="fa fa-eye"></i>
                    </span>
                  </ToolTip>
                  <ToolTip tip="edit">
                    <span
                      className="rounded p-1  mx-1 hover:bg-gray-100 hover:text-sky-600 hover:cursor-pointer"
                      onClick={(e) => {
                        navigate(`/quiz/edit/${item?.id}`);
                      }}
                    >
                      <i className="fa fa-pencil-square"></i>
                    </span>
                  </ToolTip>
                  <ToolTip tip="link">
                    <span
                      className="rounded p-1  mx-1 hover:bg-gray-100 hover:text-yellow-600 hover:cursor-pointer"
                      onClick={(e) => {
                        navigate(`/view/${item?.id}`);
                      }}
                    >
                      <i className="fa fa-link"></i>
                    </span>
                  </ToolTip>
                  <ToolTip tip="delete">
                    <span
                      className="rounded p-1  mx-1 hover:bg-gray-100 hover:text-red-600 hover:cursor-pointer"
                      onClick={(e) => {
                        setModal({
                          isOpen: true,
                          item,
                        });
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </span>
                  </ToolTip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={modal.isOpen}>
        <div className="bg-white w-96 h-60 rounded p-4 flex flex-col">
          <div className="border-b border-b-red-500 py-2 px-4 bg-red-100">
            <h1 className="text-red-500 font-bold text-xl">Warning</h1>
          </div>
          <div className="my-8 grow text-center">
            <p className="font-bold">
              Are you sure , youn want remove the quiz
            </p>
          </div>
          <div className="border-t py-2 text-right">
            <button
              type="button"
              className="bg-red-500 px-4 py-1 mx-1 rounded text-white"
              onClick={(e) => {
                deleteQuiz(modal?.item?.id);
                setModal({
                  isOpen: false,
                  item: null,
                });
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="bg-sky-500 px-4 py-1 mx-1 rounded text-white"
              onClick={(e) => {
                setModal({
                  isOpen: false,
                  item: null,
                });
              }}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuizPage;
