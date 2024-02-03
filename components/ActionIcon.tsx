import { ReactNode } from "react"
import { Button, ButtonProps } from "./ui/button"

type Props = Partial<ButtonProps> & {
 children: ReactNode
}

const ActionIcon = ({ children, ...buttonProps }: Props) => (
 <Button
  type="submit"
  variant={"ghost"}
  size={"icon"}
  className="h-9 w-9"
  {...buttonProps}
 >
  {children}
 </Button>
)

export default ActionIcon