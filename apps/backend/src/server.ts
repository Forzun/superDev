import express from "express"
import userRouter from "./routes/user"
import adminRouter from "./routes/admin"
import contestRouter from "./routes/contest"
import timerRouter from "./routes/time"

const app = express()
app.use(express.json())

app.use("/user", userRouter)
app.use("admin", adminRouter)
app.use("/contest", contestRouter)
app.use("/api", timerRouter)

app.listen(3000, () => {
  console.log("server is running")
})
