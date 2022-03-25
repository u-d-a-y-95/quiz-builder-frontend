import { NavLink } from "react-router-dom";

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
        <NavLink
          key={menu?.id}
          to={menu?.url}
          className={({ isActive }) =>
            `block shadow-md pl-8 py-4 
            ${
              !isActive &&
              "hover:bg-gray-100 hover:cursor-pointer hover:text-sky-400 hover:font-bold hover:border-l-8 hover:border-l-sky-400"
            }  ${
              isActive && "font-bold border-l-8 border-l-sky-900 text-white bg-sky-500"
            }`
          }
        >
          <i className={menu?.icon}></i>
          <span className="ml-4">{menu?.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default LeftBar;
