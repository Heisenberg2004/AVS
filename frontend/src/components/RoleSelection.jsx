import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  // function เลือกบทบาท
  const selectRole = (role) => {
    navigate("/register", { state: { role } }); // ไปที่หน้า register พร้อมส่งค่า role ไปที่หน้า register
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>คุณเป็นใคร ?</h2>
      <button onClick={() => selectRole("student")}>นักศึกษา</button>
      <button onClick={() => selectRole("teacher")}>อาจารย์</button>
      <button onClick={() => selectRole("head")}>หัวหน้าสาขา</button>
    </div>
  );
};

export default RoleSelection;
