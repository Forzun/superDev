import { json, Router } from "express"
import { userMiddleware } from "../middleware/user"
import { prisma } from "@workspace/database"
import challengeResult from "../utils/challengeResult"

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

router.post("submit/:challengeId", userMiddleware, async (req, res) => {
  const challengeId = req.params.challengeId as string
  const code = req.body.code as string
  const userId = req.userId
  try {
    const score = await challengeResult(code)

    if (!score) {
      return
    }

    const submission = await prisma.submission.create({
      data: {
        userId: userId,
        challengeId: challengeId,
        point: JSON.stringify(score),
        submission: code,
      },
    })

    if (!submission) {
      res.status(500).json({
        message: "failed to create submission table",
      })
    }

    res.status(200).json({
      score: score,
    })
  } catch (error) {
    res.send({
      error: error,
    })
  }
})

export default router
