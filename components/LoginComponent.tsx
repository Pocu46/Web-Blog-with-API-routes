"use client"

import React from "react";
import {Transition} from "@headlessui/react";
import LoginViaApi from "@/components/LoginViaApi";
import LoginForm from "@/components/LoginForm";

const LoginComponent = () => {
  return (
    <Transition
      appear={true}
      show={true}
      enter="ease-linear duration-700"
      enterFrom="opacity-0 scale-80"
      enterTo="opacity-100 scale-100"
      className="w-full h-[100vh] flex justify-start flex-col items-start pt-[64px]"
    >
      <LoginForm />
      <LoginViaApi />
    </Transition>
  )
}

export default LoginComponent;