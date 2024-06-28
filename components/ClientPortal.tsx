import React from "react";
import { createPortal } from "react-dom";

type ClientPortalType = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void | null;
  root: string;
};

const ClientPortal: React.FC<ClientPortalType> = ({ children, show, root }) => {
  if (typeof window !== "undefined") {
    const rootElement = document.getElementById(root);

    if (rootElement && show) {
      return createPortal(children, rootElement);
    }
  }

  return null;
};

export default ClientPortal;
