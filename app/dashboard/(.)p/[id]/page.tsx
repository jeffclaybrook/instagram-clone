import { notFound } from "next/navigation"
import { fetchPostById } from "@/lib/data"
import PostView from "@/components/PostView"

type Props = {
 params: {
  id: string
 }
}

const PostModal = async ({ params: { id } }: Props) => {
 const post = await fetchPostById(id)
 
 if (!post) {
  notFound()
 }

 return <PostView id={id} post={post} />
}

export default PostModal