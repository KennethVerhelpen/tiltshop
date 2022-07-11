import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"
import { ArticleType } from "../../lib/types";

export const likes = () => async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed?'})
  }
  console.log("triggered")
  const updatedArticle: ArticleType = JSON.parse(req.body);
  console.log("updatedArticle", updatedArticle)
  const updatedLikes = await prisma.article.update({
    where: {
      slug: updatedArticle.slug,
    },
    data: {
      likes: {
        increment: 1,
      }
    },
  })

  res.json(updatedLikes)
}

export default likes;