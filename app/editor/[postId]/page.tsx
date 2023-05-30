import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"

async function getPostForUser(postId, userId) {
  // const em =await getEM()
  // return await db.post.findFirst({
  //   where: {
  //     id: postId,
  //     authorId: userId,
  //   },
  // })
}

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const post = {}
  // const post = await getPostForUser(params.postId, user.id)
  //
  // if (!post) {
  //   notFound()
  // }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  )
}
