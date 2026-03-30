import { Request, Response, Router } from "express"

const router = Router()

router.get("/active", (req: Request, res: Response) => {
  const { offset, page } = req.query
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
