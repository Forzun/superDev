import { Router } from "express"

const router = Router()

router.get("server/time", (req, res) => {
  const serverTime = Date.now()
  return res.send(200).json({
    serverTime: serverTime,
  })
})
