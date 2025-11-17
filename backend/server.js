import express from "express"
import dotenv from "dotenv"
import { initDB, sql } from "./config/db.js"

dotenv.config()

const app = express()

app.use(express.json())
const PORT = process.env.PORT || 5001

app.get("/", (req, res) => {
    res.send("It's working")
})

app.post("/api/transactions", async (req, res) => {
    try {
        const { user_id, title, amount, category } = req.body   
        if (!user_id || !title || !amount || !category === undefined) {  
            return res.status(400).send("All fields are required") 
        }
        const transaction = await sql`INSERT INTO transactions (user_id, title, amount, category) VALUES (${user_id}, ${title}, ${amount}, ${category}) RETURNING *`
        return res.status(201).json(transaction)
    } catch (error) {
        console.error("Error creating transaction", error)
        return res.status(500).send("Internal Server Error")
    }
} )   

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.error("Failed to initialize database", error)
})