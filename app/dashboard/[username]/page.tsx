import { fetchPostsByUsername } from "@/lib/data"
import PostsGrid from "@/components/PostsGrid"

const ProfilePage = async ({ params: {username} }: { params:{ username: string} }) => {
 const posts = await fetchPostsByUsername(username)

 return <PostsGrid posts={posts} />
}

export default ProfilePage