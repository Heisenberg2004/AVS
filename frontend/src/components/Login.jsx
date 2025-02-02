import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle login
  const handleLogin = async () => {
    try {
      //ใช้ axios ส่ง Post Request ไปที่ API /api/auth/login , ส่งค่า { email, password } ไปให้ Backend ตรวจสอบ
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token); // ถ้า login สำเร็จ เก็บ JWT token ไว้ใน localStorage
      alert("ล็อกอินสำเร็จ!");
      navigate("/home"); // ไปที่หน้าหลัก
    } catch (error) {
      alert(error.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  // handle registerclick
  const handleRegisterClick = () => {
    navigate("/role-selection"); // ไปที่หน้าเลือก Role
  };

  return (
    <div style={{ textAign: "center", marginTop: "50px" }}>
      <h2>เข้าสู่ระบบ</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>ยืนยัน</button>
      <button onClick={handleRegisterClick}>ลงทะเบียน</button>
    </div>
  );
};

export default Login;
