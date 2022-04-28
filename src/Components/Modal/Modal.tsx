import { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

const Backdrop = () => {
  return <div className="backdrop" />;
};

const ModalOverlay = ({ children }: { children: ReactNode }) => (
  <div className="modal">{children}</div>
);

export const Modal = ({ children }: { children: ReactNode }) => {
  const portalElement = document.getElementById("overlays");

  return (
    <>
      {portalElement && ReactDOM.createPortal(<Backdrop />, portalElement)}
      {portalElement &&
        ReactDOM.createPortal(
          <ModalOverlay>{children}</ModalOverlay>,
          portalElement
        )}
    </>
  );
};
