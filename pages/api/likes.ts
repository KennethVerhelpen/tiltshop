import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { ArticleType } from "../../lib/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const articleSlug: ArticleType['slug'] = req.body.slug;

  if (req.method === 'PATCH') {
    try {
      const home = await prisma.article.update({
        where: {
          slug: articleSlug,
        },
        data: {
          likes: {
            increment: 1,
          }
        },
      });
      res.status(200).json(home);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
  }
}