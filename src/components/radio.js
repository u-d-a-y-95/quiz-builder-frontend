const Radio = ({ name, id, className, option,checked}) => {
  return (
    <>
      <div className="flex items-center">
        <input
          type="radio"
          name={name}
          className="h-8 w-6"
          id={id}
          value={option}
          checked={checked}
          onChange={e=>{}}
        />
        <label className="ml-2 font-bold" htmlFor={id}>
          {option}
        </label>
      </div>
    </>
  );
};

export default Radio;
