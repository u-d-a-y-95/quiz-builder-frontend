const TopBar = () => {
  return (
    <div className="h-20 shadow-md border-b-2 border-b-sky-500 flex items-center justify-between">
      <div>
        <span className="text-lg font-bold tracking-widest ml-8 text-sky-500">
          Quiz Maker
        </span>
      </div>
      <div>
        <div className="w-10 h-10 shadow-lg mr-8 rounded-full ring-2 ring-offset-2 ring-sky-500">
          <img
            className="h-10 w-10 rounded-full"
            src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
            alt="avater"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar
