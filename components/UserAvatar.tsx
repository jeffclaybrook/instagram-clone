import type { AvatarProps } from "@radix-ui/react-avatar"
import type { User } from "next-auth"
import { Avatar } from "./ui/avatar"
import Image from "next/image"

type Props = Partial<AvatarProps> & {
 user: User | undefined
}

const UserAvatar = ({ user, ...avatarProps }: Props) => (
 <Avatar className="relative h-8 w-8" {...avatarProps}>
  <Image
   src={user?.image || "https://scontent-dfw5-1.cdninstagram.com/v/t51.2885-19/138769742_495076041458554_4151526244171828755_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-dfw5-1.cdninstagram.com&_nc_cat=110&_nc_ohc=cb2_MosFzYcAX_n7UXp&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDjHkKxbMC8-oic6cwr7XDA_0nc_c-Nv4373_XvtKcDZg&oe=65C21B79&_nc_sid=8b3546"}
   alt={`${user?.name}'s profile picture`}
   fill
   className="rounded-full object-cover"
  />
 </Avatar>
)

export default UserAvatar