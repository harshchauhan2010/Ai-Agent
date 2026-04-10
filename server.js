
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let db;

async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Harsh@2010",
      database: "ecommerce_app",
    });
    console.log("DB connected Successfully.. ");
  } catch (err) {
    console.error("DB connection failed", err);
  }
}

connectDB();


app.post("/query", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query.toLowerCase().includes("select")) {
      return res.json({ error: "Only SELECT allowed" });
    }

    const [rows] = await db.query(query);

    res.json({
      success: true,
      data: rows,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "DB error",
    });
  }
});

// // 🔥 Chat route (n8n ke liye)
// app.post("/chat", async (req, res) => {
//   try {
//     const axios = require("axios");

//     const response = await axios.post(
//       "http://localhost:5678/webhook/chat-ai",
//       {
//         message: req.body.message,
//       }
//     );

//     res.json(response.data);

//   } catch (error) {
//     res.status(500).json({
//       error: "n8n error",
//     });
//   }
// });

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running 🚀");
});