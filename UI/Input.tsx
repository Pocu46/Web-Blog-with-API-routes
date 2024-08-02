import React from "react";

type InputProps = {
  id: string,
  label: string,
  placeholder?: string,
  state: string,
  type: string,
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
  error: boolean,
  errorMessage: string,
}

const Input: React.FC<InputProps> = ({id, label, placeholder, state, type,  changeHandler, error, errorMessage}) => {
  return (
    <div className="my-2 flex flex-col">
      <label htmlFor={id} className="mb-2">{label}</label>
      <input
        id={id}
        type={type}
        value={state}
        onChange={changeHandler}
        className={error ? "w-full px-3 py-1.5 bg-[#e5b6c0] rounded-md border-2 border-solid border-[red]" : "w-full px-3 py-1.5 rounded-md border-2 border-solid border-[#99aec3]"}
        placeholder={placeholder}
      />
      {error && <p className="text-[red]">{errorMessage}</p>}
    </div>
  )
}

export default Input;