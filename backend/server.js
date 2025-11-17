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
        if (!user_id || !title || amount == null || category == null) {
            return res.status(400).send("All fields are required")
        }
        const result = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `
        return res.status(201).json(result[0])
    } catch (error) {
        console.error("Error creating transaction", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})
 

app.get("/api/transactions/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`
        return res.status(200).json(transactions)
    } catch (error) {
        console.error("Error fetching transactions", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }           
})

app.delete("/api/transactions/:id", async (req, res) => {
    try {
        const { id } = req.params
        if(isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid transaction ID" })
        }
        const result = await sql`
            DELETE FROM transactions
            WHERE id = ${id}
            RETURNING *
        `
        if (result.length === 0) {
            return res.status(404).json({ message: "Transaction not found" })
        }
        return res.status(200).json({
            message: "Transaction deleted successfully",
            deleted: result[0]
        })  
    } catch (error) {
        console.error("Error deleting transaction", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

app.get("/api/transactions/summary/:userId", async (req, res) => {
    try{
        const { userId } = req.params  
        
    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
    `;

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as income FROM transactions
      WHERE user_id = ${userId} AND amount > 0
    `;

    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions
      WHERE user_id = ${userId} AND amount < 0
    `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });

    }catch(error){
         console.error("Error getting summary", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.error("Failed to initialize database", error)
})