"use client"

import React, {useState} from "react";
import Modal from "@/components/Modal";
import BurgerMenu from "@/components/BurgerMenu";
import HeaderProfileComponent from "@/components/HeaderProfileComponent";
import {useSession} from "next-auth/react";
import {sessionUserType} from "@/utils/models";

const Header = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const session = useSession()
  const sessionUser = session?.data?.user as sessionUserType

  const burgerOpen = () => {
    setIsOpened(true)
    document.body.style.overflow = 'hidden'
  }

  const burgerClose = () => {
    setIsOpened(false)
    document.body.style.overflow = ''
  }

  return (
    <header className="flex justify-between items-center bg-[#BCC6CC] w-full h-16 relative">
      <div
        className="burger-wrapper"
        onClick={burgerOpen}
      >
        <span className="h-[3px] w-[26px] bg-[white]"/>
        <span className={isOpened ? "h-[3px] w-[26px] bg-[white] my-2" : "burger-line"}/>
        <span className="h-[3px] w-[26px] bg-[white]"/>
      </div>

      {sessionUser && <HeaderProfileComponent id={sessionUser.id} image={sessionUser?.image} username={sessionUser?.username}/>}

      <Modal
        style="ml-0 mr-auto mt-16 mb-0 w-[400px] h-[calc(100vh_-_64px)] bg-[#5d5b76] relative left-0 bottom-0 modal backdrop:bg-[rgba(0,0,0,0.2)] max-sm:w-full z-[5]"
        open={isOpened}
        onClose={burgerClose}
        root="modalId"
      >
        <BurgerMenu action={burgerClose}/>
      </Modal>
    </header>
  )
}

export default Header;