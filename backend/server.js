import express from "express"
import dotenv from "dotenv"
import { initDB } from "./src/config/db.js"
import rateLimiter from "./src/middleware/rateLimiter.js"
import transactionsRoute from "./src/routes/transactionsRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(rateLimiter)
const PORT = process.env.PORT || 5001

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.error("Failed to initialize database", error)
})