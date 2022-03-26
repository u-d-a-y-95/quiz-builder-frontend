const ToolTip = ({ children, tip, className }) => {
  return (
    <span className="tooltip relative">
      {children}
      <span className="tip inline-block absolute bg-gray-700 text-white rounded invisible px-2 py-1 z-1 px-4">{tip}</span>
    </span>
  );
};

export default ToolTip;
