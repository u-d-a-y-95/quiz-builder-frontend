const QuizPage = () => {
  const headers = [
    "#",
    "Title",
    "Type",
    "Questions",
    "Total Points",
    "Actions",
  ];
  const data = [
    {
      id: 12,
      title: "Basic Math Quiz",
      type: "Single Page",
      questions: 10,
      totalPoint: 100,
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-sky-500 text-2xl tracking-widest">
          Quiz
        </h1>
        <button
          type="button"
          className="bg-sky-500 px-6 py-2 text-white rounded"
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
            {data?.map((item, index) => (
              <tr>
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
                  <span className="rounded p-1  mx-1 hover:bg-gray-100 hover:text-sky-600 hover:cursor-pointer">
                    <i className="fa fa-eye"></i>
                    
                  </span>
                  <span className="rounded p-1  mx-1 hover:bg-gray-100 hover:text-yellow-600 hover:cursor-pointer">
                    <i className="fa fa-link"></i>
                  </span>
                  <span className="rounded p-1  mx-1 hover:bg-gray-100 hover:text-red-600 hover:cursor-pointer">
                    <i className="fa fa-trash"></i>
                  </span>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizPage;
