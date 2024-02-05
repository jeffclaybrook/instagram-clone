import { Metadata } from "next"
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { fetchProfile } from "@/lib/data"
import ProfileForm from "@/components/ProfileForm"

export const metadata: Metadata = {
 title: "Edit profile",
 description: "Edit profile"
}

const EditProfile = async () => {
 const session = await auth()
 const profile = await fetchProfile(session?.user.username!)

 if (!profile) {
  notFound()
 }

 return (
  <div className="px-12">
   <h1 className="text-2xl font-medium">Edit profile</h1>
   <ProfileForm profile={profile} />
  </div>
 )
}

export default EditProfile