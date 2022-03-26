import ReactDom from "react-dom";

const Modal = ({ open, children }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <div
      style={{
        background: "rgba(0,0,0,0.9)",
      }}
      className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-1"
    >
      {children}
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
