import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal = ({ open, onClose, children, className, escClose, outlineClose }: ModalProps) => {
  if (!open) return null;
  if(escClose)
    window.addEventListener("keydown", (e)=>{if(e.key =='Escape') onClose();});
  const portal = ReactDOM.createPortal(
    <>
      <div className={styles.overlayStyle} onClick={outlineClose? onClose:null} />
      <div className={styles.modalStyle +' '+ className}>
        {children}
      </div>
    </>,
    document.getElementById("global-modal") as HTMLElement
  );

  return portal;
};

// <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//      모달내용
// </Modal>

// const Modal = ({ open, onClose, children }: ModalProps) => {
//   if (!open) return null;
//   return ReactDOM.createPortal(
//     <>
//       <div className={styles.overlayStyle} />
//       <div className={styles.modalStyle}>
//         <button onClick={onClose}>닫기</button>
//         {children}
//       </div>
//     </>,
//     document.getElementById("global-modal") as HTMLElement
//   );
// };

export default Modal;