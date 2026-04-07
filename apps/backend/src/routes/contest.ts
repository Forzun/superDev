import { prisma } from "@workspace/database"
import { Request, Response, Router } from "express"

const router: Router = Router()

router.get("/active", async (req: Request, res: Response) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 10)
  const cursor = req.query.cursor as string | undefined
  try {
    const contest = await prisma.contest.findMany({
      take: limit,
      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
      orderBy: {
        startTime: "desc",
      },
    })

    const nextCursor =
      contest.length === limit ? contest[contest.length - 1]?.id : null

    res.status(200).json({
      contest: contest,
      nextCursor: nextCursor,
    })
  } catch (error) {
    res.send({
      error: error,
    })
  }
})

router.get("/finished", (req: Request, res: Response) => {
  const { offset, page } = req.query
})

router.get("/:contestId", (req: Request, res: Response) => {
  const id = req.params.contestId
})

router.get("/submit/:contestId", (req: Request, res: Response) => {
  const id = req.params.contestId
})

export default router
