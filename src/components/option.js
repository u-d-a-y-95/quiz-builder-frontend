const Option = ({ name, id, className, option,checked,type,onChange}) => {
  return (
    <>
      <div className="flex items-center">
        <input
          type={type}
          name={name}
          className="h-8 w-6"
          id={id}
          value={option}
          checked={checked}
          onChange={onChange}
        />
        <label className="ml-2 font-bold" htmlFor={id}>
          {option}
        </label>
      </div>
    </>
  );
};

export default Option;
