// ไฟล์นี้มีไว้ (ตรวจสอบว่า request ที่เข้ามามี JWT Token ที่ถูกต้องหรือไม่)
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("Authorization"); // ดึง Token จาก Header (Authorization: Bearer eyJhbGciOiJIUzI1......)

  if (!token) return res.status(401).json({ message: "ไม่มี toekn" });

  try {
    const decoded = jwt.verify(token, process.env.JWWT_SECRET); // ถ้า token ถูกต้อง decoded จะได้ข้อมูลที่อยู่ใน JWT
    req.user = decoded; // เพิ่มข้อมูล user ใน req
    next();
  } catch (err) {
    res.status(401).json({ message: "Token ไม่ถูกต้อง" });
  }
};
