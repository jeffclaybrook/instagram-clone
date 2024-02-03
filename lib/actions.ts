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

export async function likePost(value: FormDataEntryValue | null) {
 const userId = await getUserId()
 const validatedFields = LikeSchema.safeParse({ postId: value })
 if (!validatedFields.success) {
  return {
   errors: validatedFields.error.flatten().fieldErrors,
   message: "Missing fields. Unable to like post"
  }
 }
 const { postId } = validatedFields.data
 const post = await prisma.post.findUnique({
  where: {
   id: postId
  }
 })
 if (!post) {
  throw new Error("Post not found")
 }
 const like = await prisma.like.findUnique({
  where: {
   postId_userId: {
    postId,
    userId
   }
  }
 })
 if (like) {
  try {
   await prisma.like.delete({
    where: {
     postId_userId: {
      postId,
      userId
     }
    }
   })
   revalidatePath("/dashboard")
   return {
    message: "Unliked post"
   }
  } catch (error) {
   return {
    message: "Database error: Unable to unlike post"
   }
  }
 }
 try {
  await prisma.like.create({
   data: {
    postId,
    userId
   }
  })
  revalidatePath("/dashboard")
  return {
   message: "Liked post"
  }
 } catch (error) {
  return {
   message: "Database error. Unable to like post"
  }
 }
}

export async function bookmarkPost(value: FormDataEntryValue | null) {
 const userId = await getUserId()
 const validatedFields = BookmarkSchema.safeParse({ postId: value })
 if (!validatedFields.success) {
  return {
   errors: validatedFields.error.flatten().fieldErrors,
   message: "Missing fields. Unable to bookmark post"
  }
 }
 const { postId } = validatedFields.data
 const post = await prisma.post.findUnique({
  where: {
   id: postId
  }
 })
 if (!post) {
  throw new Error("Post not found")
 }
 const bookmark = await prisma.savedPost.findUnique({
  where: {
   postId_userId: {
    postId,
    userId
   }
  }
 })
 if (bookmark) {
  try {
   await prisma.savedPost.delete({
    where: {
     postId_userId: {
      postId,
      userId
     }
    }
   })
   revalidatePath("/dashboard")
   return {
    message: "Unbookmarked post"
   }
  } catch (error) {
   return {
    message: "Database error: Unable to unbookmark post"
   }
  }
 }
 try {
  await prisma.savedPost.create({
   data: {
    postId,
    userId
   }
  })
  revalidatePath("/dashboard")
  return {
   message: "Bookmarked post"
  }
 } catch (error) {
  return {
   message: "Database error. Unable to bookmark post"
  }
 }
}

export async function createComment(values: z.infer<typeof CreateComment>) {
 const userId = await getUserId()
 const validatedFields = CreateComment.safeParse(values)
 if (!validatedFields.success) {
  return {
   errors: validatedFields.error.flatten().fieldErrors,
   message: "Missing fields. Unable to create comment"
  }
 }
 const { postId, body } = validatedFields.data
 const post = await prisma.post.findUnique({
  where: {
   id: postId
  }
 })
 if (!post) {
  throw new Error("Post not found")
 }
 try {
  await prisma.comment.create({
   data: {
    body,
    postId,
    userId
   }
  })
  revalidatePath("/dashboard")
  return {
   message: "Created comment"
  }
 } catch (error) {
  return {
   message: "Database error. Unable to create comment"
  }
 }
}

export async function deleteComment(formData: FormData) {
 const userId = await getUserId()
 const { id } = DeleteComment.parse({
  id: formData.get("id")
 })
 const comment = await prisma.comment.findUnique({
  where: {
   id,
   userId
  }
 })
 if (!comment) {
  throw new Error("Comment not found")
 }
 try {
  await prisma.comment.delete({
   where: {
    id
   }
  })
  revalidatePath("/dashboard")
  return {
   message: "Deleted comment"
  }
 } catch (error) {
  return {
   message: "Database error. Unable to delete comment"
  }
 }
}

export async function updatePost(values: z.infer<typeof UpdatePost>) {
 const userId = await getUserId()
 const validatedFields = UpdatePost.safeParse(values)
 if (!validatedFields.success) {
  return {
   errors: validatedFields.error.flatten().fieldErrors,
   message: "Missing fields. Unable to update post"
  }
 }
 const { id, fileUrl, caption } = validatedFields.data
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
  await prisma.post.update({
   where: {
    id
   },
   data: {
    fileUrl,
    caption
   }
  })
 } catch (error) {
  return {
   message: "Database error. Unable to update post"
  }
 }
 revalidatePath("/dashboard")
 redirect("/dashboard")
}

export async function updateProfile(values: z.infer<typeof UpdateUser>) {
 const userId = await getUserId()
 const validatedFields = UpdateUser.safeParse(values)
 if (!validatedFields.success) {
  return {
   errors: validatedFields.error.flatten().fieldErrors,
   message: "Missing fields. Unable to update profile"
  }
 }
 const { bio, gender, image, name, username, website } = validatedFields.data
 try {
  await prisma.user.update({
   where: {
    id: userId
   },
   data: {
    username,
    name,
    image,
    bio,
    gender,
    website
   }
  })
  revalidatePath("/dashboard")
  return {
   message: "Updated profile"
  }
 } catch (error) {
  return {
   message: "Database error. Unable to update profile"
  }
 }
}

export async function followUser(formData: FormData) {
 const userId = await getUserId()
 const { id } = FollowUser.parse({
  id: formData.get("id")
 })
 const user = await prisma.user.findUnique({
  where: {
   id
  }
 })
 if (!user) {
  throw new Error("User not found")
 }
 const follows = await prisma.follows.findUnique({
  where: {
   followerId_followingId: {
    followerId: userId,
    followingId: id
   }
  }
 })
 if (follows) {
  try {
   await prisma.follows.delete({
    where: {
     followerId_followingId: {
      followerId: userId,
      followingId: id
     }
    }
   })
   revalidatePath("/dashboard")
   return {
    message: "Unfollowed user"
   }
  } catch (error) {
   return {
    message: "Database error: Unable to unfollow user"
   }
  }
 }
 try {
  await prisma.follows.create({
   data: {
    followerId: userId,
    followingId: id
   }
  })
  revalidatePath("/dashboard")
  return {
   message: "Followed user"
  }
 } catch (error) {
  return {
   message: "Database error. Unable to follow user"
  }
 }
}