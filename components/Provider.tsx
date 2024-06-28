"use client"

import {QueryClientProvider} from "@tanstack/react-query";
import React, {ReactNode, useState} from "react";
import {queryClient} from "@/utils/http";

const Provider = ({children}: {children: ReactNode}) => {
  const [queryClientState] = useState(queryClient)

  return(
    <QueryClientProvider client={queryClientState}>
      {children}
    </QueryClientProvider>
  )
}

export default Provider;