"use server"

import prisma from "./prisma"
import { getUserId } from "./utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { BookmarkSchema, CreateComment, CreatePost, DeleteComment, DeletePost, FollowUser, LikeSchema, UpdatePost, UpdateUser } from "./schemas"

export async function createPost(values: z.infer<typeof CreatePost>) {
 const userId = await getUserId()
 const validatedFields = CreatePost.safeParse(values)
 if (!validatedFields.success) {
  return {
   errors: validatedFields.error.flatten().fieldErrors,
   message: "Missing fields. Unable to create post"
  }
 }
 const { fileUrl, caption } = validatedFields.data
 try {
  await prisma.post.create({
   data: {
    caption,
    fileUrl,
    user: {
     connect: {
      id: userId
     }
    }
   }
  })
 } catch (error) {
  return {
   message: "Database Error. Unable to create post"
  }
 }
 revalidatePath("/dashboard")
 redirect("/dashboard")
}

export async function deletePost(formData: FormData) {
 const userId = await getUserId()
 const { id } = DeletePost.parse({
  id: formData.get("id")
 })
 const post = await prisma.post.findUnique({
  where: {
   id,
   userId
  }
 })
 if (!post) {
  throw new Error("Post not found")
 }
 try {
  await prisma.post.delete({
   where: {
    id
   }
  })
  revalidatePath("/dashboard")
  return {
   message: "Deleted post"
  }
 } catch (error) {
  return {
   message: "Database error: Unable to delete post"
  }
 }
}

export async function likePost(value: FormDataEntryValue | null) {}

export async function bookmarkPost(value: FormDataEntryValue | null) {}

export async function createComment(values: z.infer<typeof CreateComment>) {}