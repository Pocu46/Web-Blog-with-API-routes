import React from "react";
import ClientPortal from "@/components/ClientPortal";

type ModalProps = {
  children: React.ReactNode;
  style: string;
  open: boolean;
  onClose: () => void;
  root: string;
}

const Modal: React.FC<ModalProps> = ({children, style, open, onClose, root}) => {
  return (
    <ClientPortal show={open} root={root}>
      {open && <div
        className={style}
        onClick={onClose}
      >
        {children}
      </div>}
    </ClientPortal>
  )
}

export default Modal;