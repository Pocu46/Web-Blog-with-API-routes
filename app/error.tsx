"use client"

import Error from "@/components/ErrorComponent";

export default function ErrorPage({ error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <div className="m-auto flex justify-center items-center h-[98vh] w-full">
      <Error error={error} reset={reset} />
    </div>
  )
}