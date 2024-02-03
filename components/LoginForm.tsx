"use client"

import { useFormStatus } from "react-dom"
import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { calSans } from "@/app/fonts"

export default function LoginForm() {
 return (
  <div className="space-y-3">
   <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
    <h1 className={`${calSans.className} mb-3 text-2xl dark:text-black`}>Please login to continue</h1>
    <LoginButton />
   </div>
  </div>
 )
}

function LoginButton() {
 const { pending } = useFormStatus()

 return (
  <Button
   variant={"secondary"}
   aria-disabled={pending}
   onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
   className="mt-4 w-full"
  >
   Login with Google
  </Button>
 )
}