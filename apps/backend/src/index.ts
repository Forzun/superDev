import express from "express"
import adminRouter from "./routes/admin";
import userRouter from  "./routes/user";
import contestRouter from "./routes/contest"

const app = express();
app.use(express.json());

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/contest", contestRouter)

app.listen(3005, () =>{ 
    console.log("server is running")
})