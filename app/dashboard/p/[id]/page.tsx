import { Suspense } from "react"
import { SinglePostSkeleton } from "@/components/Skeletons"
import { Separator } from "@/components/ui/separator"
import SinglePost from "@/components/SinglePost"
import MorePosts from "@/components/MorePosts"

const PostPage = ({ params: { id }}: { params: { id: string }}) => (
 <div>
  <Suspense fallback={<SinglePostSkeleton />}>
   <SinglePost id={id} />
  </Suspense>
  <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />
  <Suspense>
   <MorePosts postId={id} />
  </Suspense>
 </div>
)

export default PostPage