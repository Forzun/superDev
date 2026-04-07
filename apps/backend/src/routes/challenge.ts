import { Router } from "express"
import { userMiddleware } from "../middleware/user"
import { prisma } from "@workspace/database"

const router: Router = Router()

router.get("/challenges", async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit as string) || 10)
  const cursor = req.query.cursor as string | undefined
  try {
    const challenges = await prisma.challenge.findMany({
      take: limit,
      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
      orderBy: {
        id: "desc",
      },
    })

    const nextCursor =
      challenges.length === limit ? challenges[challenges.length - 1]?.id : null

    res.status(200).json({
      challenges: challenges,
      nextCursor: nextCursor,
    })
  } catch (error) {
    res.send({
      error: error,
    })
  }
})

router.get("/challenge/:id", async (req, res) => {
  const challengeId = req.params.id as string
  try {
    const challenge = prisma.challenge.findFirst({
      where: {
        id: challengeId,
      },
    })

    if (!challenge) {
      res.status(404).json({
        message: "challenge not found",
      })
      return
    }

    res.status(200).json({
      challenge: challenge,
    })
  } catch (error) {
    res.send({
      error: error,
    })
  }
})

router.get("submit/:challengeId", userMiddleware, async (req, res) => {
  const id = req.params.challengeId
  try {
  } catch (error) {
    res.send({
      error: error,
    })
  }
})

export default router
