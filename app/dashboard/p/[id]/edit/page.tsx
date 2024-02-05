import { notFound } from "next/navigation"
import { fetchPostById } from "@/lib/data"
import EditPost from "@/components/EditPost"

type Props = {
 params: {
  id: string
 }
}

const EditPostPage = async ({ params: { id } }: Props) => {
 const post = await fetchPostById(id)

 if (!post) {
  notFound()
 }

 return <EditPost id={id} post={post} />
}

export default EditPostPage