import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation ใช้สำหรับรับค่าที่ถูกส่งมาจากหน้าอื่น
import axios from "axios";

const Register = () => {
  const { state } = useLocation(); // ใช้ useLocatin เพื่อรับค่าที่ถูกส่งมาจากหน้าเลือก Role
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    // ใช้ useState เก็บข้อมูลฟอร์ม
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentID: "",
    teacherID: "",
    major: "",
    role: state?.role || "studetn", // จะมีค่าที่ถูกส่งมจาก navigate('/register', { state: { role } })
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value }); // อัปเดตค่าของ input ที่เปลี่ยนไปตามชื่อของ input(name)
  };

  const handleSubmit = async () => {
    // ส่งข้อมูลไปยัง Backend
    try {
      await axios.post("http://localhost:3000/api/auth/register", userData);
      alert("สมัครสำเร็จ!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>ลงทะเบียน ({userData.role})</h2>
      <input
        type="text"
        name="fname"
        placeholder="ชื่อ"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="lname"
        placeholder="นามสกุล"
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      <br />
      {userData.role === "student" && (
        <input
          type="text"
          name="studentID"
          placeholder="Student ID"
          onChange={handleChange}
        />
      )}
      {(userData.role === "teacher" || userData.role === "head") && (
        <input
          type="text"
          name="teacherID"
          placeholder="Teacher ID"
          onChange={handleChange}
        />
      )}
      <input
        type="text"
        name="major"
        placeholder="สาขา"
        onChange={handleChange}
      />
      <br />
      <button onClick={handleSubmit}>สมัครสมาชิก</button>
    </div>
  );
};

export default Register;
