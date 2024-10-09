import React from "react";
import ClientPortal from "@/components/ClientPortal";
import {Transition} from "@headlessui/react";

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
      <Transition
        as={"div"}
        appear={true}
        show={open}
        enter="ease-linear duration-700"
        enterFrom="opacity-0 scale-80"
        enterTo="opacity-100 scale-100"
        className={style}
        onClick={onClose}
        data-cy="modal-backdrop"
      >
        {children}
      </Transition>
    </ClientPortal>
  )
}

export default Modal;