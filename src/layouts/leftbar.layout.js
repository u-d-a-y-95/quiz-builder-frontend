const LeftBar = () => {
  const manus = [
    {
      id: 1,
      url: "quiz",
      label: "Quiz",
      icon: "fa fa-list-alt",
    },
    {
      id: 2,
      url: "users",
      label: "Users",
      icon: "fa fa-users",
    },
    {
      id: 3,
      url: "profile",
      label: "Profile",
      icon: "fa fa-user",
    },
  ];
  return (
    <div style={{ minWidth: "250px" }} className="shadow-lg">
      {manus?.map((menu) => (
        <div key={menu?.id} className="shadow-md pl-8 py-4 hover:bg-gray-200 hover:cursor-pointer hover:text-sky-500 hover:font-bold hover:border-l-4 hover:border-l-sky-500">
          <i className={menu?.icon}></i>
          <span className="ml-4">{menu?.label}</span>
        </div>
      ))}
    </div>
  );
};

export default LeftBar;
