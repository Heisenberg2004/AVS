const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = (req, res) => {
  const {
    fname,
    lname,
    studentID,
    teacherID,
    email,
    password,
    confirmPassword,
    major,
    role,
  } = req.body;

  //เช็คว่ากรอกข้อมูลครบมั้ย
  if (
    !fname ||
    !lname ||
    !email ||
    !password ||
    !confirmPassword ||
    !role ||
    !major
  ) {
    return res.status(400).json({ message: "กรอกข้อมูลให้ครบ" });
  }

  // เช็คว่า password กับ confirmPassword ตรงกันหรือไม่
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "รหัสผ่านไม่ตรงกัน" });
  }

  // เช็คว่า email ลงท้ายด้วย .ac.th รึเปล่า
  if (!email.endsWith("@payap.ac.th")) {
    return res
      .status(400)
      .json({ message: "ต้องใช้อีเมลที่ลงท้ายด้วย @payap.ac.th เท่านั้น" });
  }

  // เช็คเงื่อนไขของ email ตาม role
  if (role === "student") {
    // อีเมลนักศึกษาต้องเป็น 10 ตัวเลข + "@payap.ac.th"
    const studentEmailPattern = /^[0-9]{10}@payap\.ac\.th$/;
    if (!studentEmailPattern.test(email)) {
      return res
        .status(400)
        .json({ message: "อีเมลนักศึกษาต้องเป็นตัวเลข 10 หลักเท่านั้น" });
    }
  } else if (role === "teacher" || role === "head") {
    // อีเมลอาจารย์และหัวหน้าสาขาต้องลงท้ายด้วย "@payap.ac.th"
    const teacherEmailPattern = /^[a-zA-Z0-9._%+-]+@payap\.ac\.th$/;
    if (!teacherEmailPattern.test(email)) {
      return res.status(400).json({
        message: "อีเมลนี้อาจารย์และหัวหน้าสาขาต้องลงท้ายด้วย @payap.ac.th",
      });
    }
  }

  // เช็คว่ามี email ในระบบมั้ย
  User.findByEmail(email, (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: "Email นี้มีในระบบแล้ว" });
    }

    User.create(
      { fname, lname, studentID, teacherID, email, password, major, role },
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "เกิดข้อผิดพลาด" });
        }
        res.status(201).json({ message: "สมัครสำเร็จ!" });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // เช็คว่ากรอกข้อมูลครบมั้ย
  if (!email || !password) {
    return res.status(400).json({ message: "กรอกข้อมูลให้ครบ" });
  }

  User.findByEmail(email, async (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({ message: "Email หรือรหัสผ่านผิด" });
    }

    const user = results[0]; // results เป็น array ของผู้ใช้ที่ตรงกับ email
    const isMathc = await bcrypt.compare(password, user.password);

    if (!isMathc) {
      return res.status(400).json({ message: "Email หรือรหัสผ่านผิด" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
      },
    });
  });
};
