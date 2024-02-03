import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => (
 <div className="grid place-items-center h-screen">
  {children}
 </div>
)

export default AuthLayout