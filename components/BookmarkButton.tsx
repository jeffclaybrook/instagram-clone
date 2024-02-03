"use client"

import { useOptimistic } from "react"
import { Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { bookmarkPost } from "@/lib/actions"
import { PostWithExtras } from "@/lib/definitions"
import { SavedPost } from "@prisma/client"
import ActionIcon from "./ActionIcon"

type Props = {
 post: PostWithExtras
 userId?: string
}

const BookmarkButton = ({ post, userId }: Props) => {
 const predicate = (bookmark: SavedPost) =>
  bookmark.userId === userId && bookmark.postId === post.id
 const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<SavedPost[]>(
  post.savedBy,
  // @ts-ignore
  (state: SavedPost[], newBookmark: savedPost) =>
   state.find(predicate)
    ? state.filter((bookmark) => bookmark.userId !== userId)
    : [...state, newBookmark]
 )

 return (
  <form
   action={async (formData: FormData) => {
    const postId = formData.get("postId")
    addOptimisticBookmark({ postId, userId })
    await bookmarkPost(postId)
   }}
   className="ml-auto"
  >
   <input
    type="hidden"
    name="postId"
    value={post.id}
   />
   <ActionIcon>
    <Bookmark className={cn("h-6, w-6", {"dark:fill-white fill-black": optimisticBookmarks.some(predicate)})} />
   </ActionIcon>
  </form>
 )
}

export default BookmarkButton