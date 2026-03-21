import { Router } from "express"; 

const router = Router();


router.get("/active" , (req , res) =>  {
    const {offset , page} = req.query
})

router.get("/finished", (req , res) => { 
    const {offset , page} = req.query;
})

router.get("/:contestId", async(req , res) => { 
    const id = req.params.contestId; 
})


router.get("/submit/:contestId", async(req , res) => { 
    const id = req.params.contestId
})

export default router; 