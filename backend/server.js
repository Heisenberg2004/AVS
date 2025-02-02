const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
require("./config/db");

const app = express();

// Middleware
app.use(cors()); //อนุญาติให้ request มาจากทุกโดเมน
app.use(express.json()); // แปลง request body เป็น JSON
app.use("/api/auth", authRoutes); // API ที่เกี่ยวข้องกับ Auth จะอยู่ภายใต้ /api/auth (เชื่อมโยง API ที่ /api/auth กับ routes ใน authRoutes.js)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
