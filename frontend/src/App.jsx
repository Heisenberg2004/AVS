import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import RoleSelection from "./components/RoleSelection";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<h1>ยินดีต้อนรับสู่หน้าหลัก</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
