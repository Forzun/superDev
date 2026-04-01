import { Router, Request, Response } from "express"
import { SignupSchema } from "../shared/types"
import { prisma } from "@workspace/database"
import jwt from "jsonwebtoken"

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
})

export default router
