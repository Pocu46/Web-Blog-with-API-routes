"use client"

import {useState} from "react";
import Checkbox from "@/UI/Checkbox";
import Button from "@/UI/Button";
import {useRouter} from "next/navigation";

const CopyrightsComponent = () => {
  const [agree, setAgree] = useState<boolean>(false)
  const router = useRouter()

  const isAgree = () => {
    setAgree((prevState) => !prevState)
  }

  const agreeSubmitHandler = () => {
    router.replace("/")
  }

  return(
    <div className="flex justify-start items-center text-center flex-col h-[calc(100vh_-_64px)]">
      <h1 className="py-3">Copyrights</h1>
      <text>
        Unauthorized use and/or duplication of this material without express and written permission from this site’s author and/or owner is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to Web-Notes with appropriate and specific direction to the original content.
        By accessing and using the Web-Notes app, you agree to comply with and be bound by the following terms and conditions. Please review these terms carefully. If you do not agree to these terms, you should not use this app.
        Use of Content: The content provided in Web-Notes is for your personal and non-commercial use only. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the app without express written permission from Web-Notes.
        User Conduct: You agree to use the app only for lawful purposes. You are prohibited from posting or transmitting through the app any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, or otherwise objectionable.
        Privacy Policy: Your use of the app is also subject to Web-Notes's Privacy Policy. Please review our Privacy Policy, which also governs the app and informs users of our data collection practices.
        Intellectual Property Rights: All content, trademarks, service marks, trade names, logos, and icons are proprietary to Web-Notes. Nothing contained on the app should be construed as granting any license or right to use any trademark without the prior written permission of Web-Notes.
        Modification of Terms: Web-Notes reserves the right to change the terms, conditions, and notices under which the app is offered. By using the app, you are agreeing to be bound by the current version of these terms and conditions.
        Disclaimer of Warranties: The app is provided on an "as is" and "as available" basis. Web-Notes makes no representations or warranties of any kind, express or implied, as to the operation of the app or the information, content, or materials included on the app.
        Limitation of Liability: In no event shall Web-Notes be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability to use the app or for the cost of procurement of substitute goods and services.
        By using the Web-Notes app, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.<br />

        <b className="py-2">© 2024 Web-Notes. All rights reserved.</b>
      </text>

      <div className="flex justify-center items-center flex-col py-3">
        <Checkbox action={isAgree} text="Agree to the app copyrights" />

        <Button
          text="Agree"
          style="btn-primary mt-5 bg-[#88bddd] m-auto transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-300 max-sm:w-[96px] max-sm:h-[26px]"
          action={agreeSubmitHandler}
          link="/"
          isButton={true}
          type="button"
          disabled={!agree}
        />
      </div>
    </div>
  )
}

export default CopyrightsComponent;