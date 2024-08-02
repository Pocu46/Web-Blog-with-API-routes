import React from "react";
import Link from "next/link";

export type ButtonProps = {
  text: string;
  style: string;
  action?:  React.MouseEventHandler<HTMLButtonElement>;
  link: string;
  isButton?: boolean;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
};
const Button: React.FC<ButtonProps> = ({text, style, action, link, isButton, type, disabled}) => {
  if(isButton) {
    return <button className={style} onClick={action} type={type} disabled={disabled} >{text}</button>
  }

  return(
    <Link className={style} href={link}>{text}</Link>
  )
}

export default Button;