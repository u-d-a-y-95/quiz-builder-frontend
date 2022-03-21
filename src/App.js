import { useState } from "react";
function App() {
  const [data, setData] = useState({
    title: "Basic Maths",
    questions: [
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
    <div className="container">
      <div>
        <h3 className="text-center">{data?.title}</h3>
        {data?.questions?.map((question, questionIndex) => (
          <div className="question-card">
            <div className="d-flex">
              <input className="w-75" />
              <button className="btn pointer">
                <i className="fa fa-image"></i>
              </button>
              <select className="">
                <option>Single</option>
                <option>Multiple</option>
              </select>
            </div>
            <div className="my-2">
              <div className="options d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <input type="checkbox" checked className="me-1" />
                  <input type="text" className="form-control" />
                </div>

                <div>
                  <button className="btn pointer">
                    <i className="fa fa-image"></i>
                  </button>
                  <button className="btn pointer">
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="options d-flex justify-content-between">
                <input className="w-90" />
                <div>
                  <button className="btn pointer">
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
