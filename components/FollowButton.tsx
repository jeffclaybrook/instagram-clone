import { followUser } from "@/lib/actions"
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import SubmitButton from "./SubmitButton"

const FollowButton = ({ profileId, isFollowing, className, buttonClassName }: { profileId: string; isFollowing?: boolean; className?: string; buttonClassName?: string }) => (
 <form action={followUser} className={className}>
  <input
   type="hidden"
   id="id"
   value={profileId}
  />
  <SubmitButton
   className={buttonVariants({
    variant: isFollowing ? "secondary" : "default",
    size: "sm",
    className: cn("!font-bold w-full", buttonClassName)
   })}
  >
   {isFollowing ? "Unfollow" : "Follow"}
  </SubmitButton>
 </form>
)

export default FollowButton