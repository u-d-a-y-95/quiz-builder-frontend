const Choicebox = ({ name, id,value,label,checked,type,onChange,className}) => {
  return (
    <>
      <div className="flex items-center">
        <input
          type={type}
          name={name}
          className={`h-8 w-6 ${className}`}
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <label className="ml-2 font-bold" htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Choicebox;
