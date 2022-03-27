import imgUrl from "../assets/image/404.jpg";
const NotFoundPage = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <img src={imgUrl} alt="404" style={{
        width:"700px"
      }} />
    </div>
  );
};

export default NotFoundPage;
