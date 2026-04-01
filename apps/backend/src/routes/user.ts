import { Router, Request, Response } from "express"
import { SignupSchema } from "../shared/types"
import { prisma } from "@workspace/database"
import jwt, { JwtPayload } from "jsonwebtoken"
import sendEmail from "../utils/sendEmail"

const router: Router = Router()

router.post("/signin", async (req: Request, res: Response) => {
  const { success, data } = SignupSchema.safeParse(req.body)

  if (success == false) {
    res.status(411).json({
      message: "Incorrect email",
    })
    return
  }

  const user = await prisma.user.upsert({
    where: {
      email: data.email,
    },
    update: {},
    create: {
      email: data.email,
      role: "user",
    },
  })

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.EMAIL_JWT_PASSWORD!
  )

  if (process.env.NODE_ENV === "production") {
    sendEmail(data.email, token)
  } else {
    console.log(
      `The link for ${data.email} to login is http://localhost:3000/${process.env.FRONTEND_URL}?token=${token}`
    )
  }
  res.json({
    message: "We have emailed one time login to you, please check you email",
  })
})

router.get("/signin/post", (req, res) => {
  try {
    const token = req.query.token as string

    const decoded = jwt.verify(
      token,
      process.env.EMAIL_JWT_PASSWORD!
    ) as JwtPayload

    if (decoded.userId) {
      const token = jwt.sign(
        {
          userId: decoded.userId,
        },
        process.env.USER_JWT_PASSWORD!
      )
      res.status(200).json({
        token: token,
      })
    } else {
      res.status(411).json({
        message: "Incorret token",
      })
    }
  } catch (error) {
    res.status(411).json({
      message: "Incorrect",
    })
  }
})

export default router
