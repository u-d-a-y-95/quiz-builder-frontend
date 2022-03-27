import { useNavigate } from "react-router-dom";

const ScoreView = ({ score, reset }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-600 rounded p-8">
      <h1 className="text-center text-2xl font-bold tracking-widest underline decoration-wavy">
        Score Card
      </h1>
      <table className="table-auto w-full my-4 font-bold text-gray-700 border">
        <thead>
          <tr>
            <th className="py-1 px-3">Fcator</th>
            <th className="border py-1 px-3">value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border  py-1 px-3">Quiz</td>
            <td className="border py-1 px-3">{score?.title}</td>
          </tr>
          <tr>
            <td className="border py-1 px-3">Total Questions</td>
            <td className="border py-1 px-3">{score?.totalQuestion}</td>
          </tr>
          <tr>
            <td className="border py-1 px-3">Total Point</td>
            <td className="border py-1 px-3">{score?.point}</td>
          </tr>
          <tr>
            <td className="border py-1 px-3">Total Right Answer</td>
            <td className="border py-1 px-3">{score?.rightAnswer}</td>
          </tr>
          <tr>
            <td className="border py-1 px-3">Achieved Points</td>
            <td className="border  py-1 px-3 bg-teal-400">
              {score?.rightPoint}
            </td>
          </tr>
          <tr>
            <td className="border py-1 px-3">Total Wrong Answer</td>
            <td className="border py-1 px-3">
              {score?.totalQuestion - score?.rightAnswer}
            </td>
          </tr>
          <tr>
            <td className="border py-1 px-3">Lose Points</td>
            <td className="border py-1 px-3 bg-rose-400 ">
              {score?.wrongPoint}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-right">
        <button
          type="button"
          className="bg-sky-500 px-4 py-1 text-white rounded mx-1 capitalize"
          onClick={(e) => {
            reset();
          }}
        >
          Try Again
        </button>
        <button
          type="button"
          className="bg-teal-500 px-4 py-1 text-white rounded mx-1 capitalize"
          onClick={(e) => {
            navigate("/quiz");
          }}
        >
          goto Quiz Page
        </button>
      </div>
    </div>
  );
};

export default ScoreView;
