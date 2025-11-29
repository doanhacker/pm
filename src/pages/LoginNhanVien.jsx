import { useState } from "react";
import "../styles/Login.css";

export default function LoginNhanVien() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="login-container">
      <div className="login-box">
        
        {/* TABS */}
        <div className="login-tabs">
          <div className="active">Đăng nhập</div>
          <div>Đăng ký</div>
        </div>

        {/* INPUT: Số điện thoại / email */}
        <label className="login-label">Số điện thoại/Email</label>
        <input
          type="text"
          className="login-input"
          placeholder="Nhập số điện thoại hoặc email"
        />

        {/* INPUT: Mật khẩu */}
        <label className="login-label">Mật khẩu</label>
        <div className="password-wrapper">
          <input
            type={showPass ? "text" : "password"}
            className="login-input"
            placeholder="Nhập mật khẩu"
          />
          <span
            className="password-toggle"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "Ẩn" : "Hiện"}
          </span>
        </div>

        {/* FOOTER */}
        <div className="login-footer">
          <a href="#">Quên mật khẩu?</a>
        </div>

        {/* BUTTON */}
        <button className="login-button">
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
