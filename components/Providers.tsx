"use client"

import {QueryClientProvider} from "@tanstack/react-query";
import React, {ReactNode, useState} from "react";
import {queryClient} from "@/utils/http";
import {SessionProvider} from "next-auth/react";

const Providers = ({children}: { children: ReactNode }) => {
  const [queryClientState] = useState(queryClient)

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClientState}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default Providers;