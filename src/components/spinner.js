import imgUrl from "../assets/image/spinner.svg"
const Spinner = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-50 flex justify-center items-center">
        <img src={imgUrl} alt="spinner"/>
    </div>
  );
};

export default Spinner
