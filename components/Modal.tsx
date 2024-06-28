import React, {useEffect, useRef} from "react";
import ClientPortal from "@/components/ClientPortal";

type ModalProps = {
  children: React.ReactNode;
  style: string;
  open: boolean;
  onClose: () => void;
  root: string;
}

const Modal: React.FC<ModalProps> = ({children, style, open, onClose, root}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    const target = (event.target as HTMLElement).className

    if (target.includes('modal')) {
      dialogRef.current?.close()
      document.removeEventListener('click', handleClickOutside)
    }
  }

  useEffect(() => {
    if (open) {
      if (dialogRef.current) {
        dialogRef.current.showModal();
        document.addEventListener("click", handleClickOutside);
      }
    } else {
      if (dialogRef.current) {
        dialogRef.current.close();
        document.removeEventListener("click", handleClickOutside);
      }
    }

    return () => {
      if (dialogRef.current) {
        dialogRef.current.close();
        document.removeEventListener("click", handleClickOutside);
      }
    };
  }, [open]);

  return (
    <ClientPortal show={open} root={root}>
      <dialog
        className={style}
        ref={dialogRef}
        onClose={onClose}
      >
        {children}
      </dialog>
    </ClientPortal>
  )
}

export default Modal;