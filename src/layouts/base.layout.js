import LeftBar from "./leftbar.layout";
import MainContent from "./main-content.layout";
import TopBar from "./topbar.layout";

const BaseLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopBar/>
      <div className="flex mt-4 h-full">
        <LeftBar/>
        <MainContent/>
      </div>
    </div>
  );
};

export default BaseLayout;
