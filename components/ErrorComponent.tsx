import React, {useEffect} from "react";
import Button, {ButtonProps} from "@/UI/Button";

type ErrorProps = {
  error: Error | { message: string };
  reset: ButtonProps['action'];
}

const ErrorComponent: React.FC<ErrorProps> = ({error,reset}) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      className="m-auto w-full h-[calc(100vh_-_64px_-_64px)] flex justify-center align-center flex-col max-sm:w-full max-sm:h-full">
      <div className="m-auto w-full h-auto flex justify-center align-center flex-col bg-pink-300 border-[3px] rounded-xl border-solid border-[red]">
        <h2 className="text-center text-[#000] text-4xl font-[300] leading-[1.2] my-2">An Error accrued!</h2>

        <p
          className="text-center text-[red] my-5 text-4xl font-[300] leading-[1.2]">{"The server doesn't respond. Please try again later!"}</p>

        <div className="my-4 flex justify-between flex-row">
          <Button
            text="Reset"
            style="btn-primary mt-5 bg-[#88bddd] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]"
            link="/post/posts"
            type="button"
            isButton={true}
            action={reset}
          />
          <Button
            text="Home"
            style="btn-primary mt-5 bg-[#88bddd] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]"
            link="/"
          />
        </div>
      </div>
    </div>
  )
}

export default ErrorComponent;