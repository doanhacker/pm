import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

export default function Auth() {
  const [tab, setTab] = useState("login");
  const [showPass, setShowPass] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    TenDangNhap: "",
    MatKhau: ""
  });

  const [errorMsg, setErrorMsg] = useState("");  // ❗ lỗi hiển thị ở giao diện

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setErrorMsg(""); // Xóa lỗi cũ

      const res = await axios.post("http://localhost:5000/api/auth/login-admin", loginInfo);

      // Lưu token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminName", res.data.user.hoTen);

      // ❗ Không hiện alert → chuyển trang luôn
      navigate("/admin/dashboard");

    } catch (err) {
      const msg = err.response?.data?.message || "Đăng nhập thất bại!";
      setErrorMsg(msg);     // ❗ Gán lỗi để hiển thị dưới input
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <div className="auth-tabs">
          <div
            className={tab === "login" ? "active" : ""}
            onClick={() => setTab("login")}
          >
            Đăng nhập
          </div>
          <div
            className={tab === "register" ? "active" : ""}
            onClick={() => setTab("register")}
          >
            Đăng ký
          </div>
        </div>

        {/* ------- FORM ĐĂNG NHẬP ------- */}
        {tab === "login" && (
          <>
            <label className="auth-label">Tên đăng nhập</label>
            <input
              className={`auth-input ${errorMsg ? "input-error" : ""}`}
              placeholder="Nhập tên đăng nhập"
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, TenDangNhap: e.target.value })
              }
            />

            <label className="auth-label">Mật khẩu</label>
            <div className="password-wrapper">
              <input
                type={showPass ? "text" : "password"}
                className={`auth-input ${errorMsg ? "input-error" : ""}`}
                placeholder="Nhập mật khẩu"
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, MatKhau: e.target.value })
                }
              />
              <span
                className="password-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "Ẩn" : "Hiện"}
              </span>
            </div>

            {/* Hiển thị lỗi dạng đẹp giống Fahasa */}
            {errorMsg && <p className="error-text">{errorMsg}</p>}

            <button className="auth-button" onClick={handleLogin}>
              Đăng nhập
            </button>
          </>
        )}
      </div>
    </div>
  );
}
