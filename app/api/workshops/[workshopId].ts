import { NextApiRequest, NextApiResponse } from "next"
// import * as z from "zod"
//
// import { withMethods } from "@/lib/api-middlewares/with-methods"
// import { withPost } from "@/lib/api-middlewares/with-post"
// import { postPatchSchema } from "@/lib/validations/workshop"
import getEM from "@/orm/getEM"

export async function DELETE(req: NextApiRequest) {
  try {
    // const em = await getEM()

    // await em.post.delete({
    //   where: {
    //     id: req.query.postId as string,
    //   },
    // })

    return new Response(null, { status: 204 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
  // if (req.method === "PATCH") {
  //   try {
  //     const postId = req.query.postId as string
  //     const post = await db.post.findUnique({
  //       where: {
  //         id: postId,
  //       },
  //     })
  //
  //     if (!post) {
  //       throw new Error("Post not found.")
  //     }
  //
  //     const body = postPatchSchema.parse(req.body)
  //
  //     // TODO: Implement sanitization for content.
  //     await db.post.update({
  //       where: {
  //         id: post.id,
  //       },
  //       data: {
  //         title: body.title || post.title,
  //         content: body.content,
  //       },
  //     })
  //
  //     return res.end()
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       return res.status(422).json(error.issues)
  //     }
  //
  //     return res.status(422).end()
  //   }
  // }
}

// export default withMethods(["DELETE", "PATCH"], withPost(handler))
