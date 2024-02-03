import { ReactNode } from "react"

function AuthLayout({ children }: { children: ReactNode }) {
 return (
  <div className="grid place-items-center h-screen">
   {children}
  </div>
 )
}

export default AuthLayout