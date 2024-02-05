import { ReactNode } from "react"
import Header from "@/components/Header"

const HomePageLayout = ({ children }: { children: ReactNode }) => (
 <div>
  <Header />
  {children}
 </div>
)

export default HomePageLayout