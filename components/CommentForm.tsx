"use client"

import { Ref } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { CreateComment } from "@/lib/schemas"
import { createComment } from "@/lib/actions"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

const CommentForm = ({ postId, className, inputRef }: { postId: string; className?: string; inputRef?: Ref<HTMLInputElement> }) => {
 const form = useForm<z.infer<typeof CreateComment>>({
  resolver: zodResolver(CreateComment),
  defaultValues: {
   body: "",
   postId
  }
 })

 const body = form.watch("body")
 const isSubmitting = form.formState.isSubmitting

 return (
  <Form {...form}>
   <form
    onSubmit={form.handleSubmit(async (values) => {
     await createComment(values)
     form.reset()
    })}
    className={cn("border-b relative border-gray-200 dark:border-neutral-800 py-3 flex items-center space-x-2 w-full px-3", className)}
   >
    {isSubmitting && (
     <div className="flex justify-center items-center w-full absolute">
      <Loader2 className="h-4 w-4 animate-spin" />
     </div>
    )}
    <FormField
     control={form.control}
     name="body"
     render={({ field }) => (
      <FormItem className="w-full flex">
       <FormControl>
        <input
         type="text"
         placeholder="Add a comment..."
         disabled={isSubmitting}
         className="bg-transparent text-sm border-none focus:outline-none flex-1 dark:text-neutral-400 placeholder-neutral-400 font-medium disabled:opacity-30"
         {...field}
        />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <button
     type="submit"
     disabled={!body.trim().length || isSubmitting}
     className="text-sky-500 text-sm font-semibold hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500"
    >
     Post
    </button>
   </form>
  </Form>
 )
}

export default CommentForm