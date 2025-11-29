import { useState } from "react";
import "../styles/sidebar.css";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [openBookMenu, setOpenBookMenu] = useState(false);

  return (
    <div className="sidebar">

      <div className="sidebar-logo">QUẢN LÝ THƯ VIỆN</div>

      <ul className="sidebar-menu">

        <li onClick={() => navigate("/admin/dashboard")}>
          Dashboard
        </li>

        <li onClick={() => navigate("/admin/borrow")}>
          Mượn sách
        </li>

        <li onClick={() => navigate("/admin/return")}>
          Trả sách
        </li>

        {/* ==== MENU QUẢN LÝ SÁCH ==== */}
        <li
          className="submenu-toggle"
          onClick={() => setOpenBookMenu(!openBookMenu)}
        >
          {openBookMenu ? <FaChevronDown /> : <FaChevronRight />}
          &nbsp; Quản lý sách
        </li>

        {openBookMenu && (
          <ul className="submenu">

            <li onClick={() => navigate("/admin/books")}>
              Danh sách sách
            </li>

            <li onClick={() => navigate("/admin/authors")}>
              Tác giả
            </li>

            <li onClick={() => navigate("/admin/types")}>
              Loại sách
            </li>

            <li onClick={() => navigate("/admin/positions")}>
              Vị trí sách
            </li>

            <li onClick={() => navigate("/admin/publishers")}>
              Nhà xuất bản
            </li>

          </ul>
        )}

        <li onClick={() => navigate("/admin/readers")}>
          Quản lý độc giả
        </li>

            <li onClick={() => navigate("/admin/static")}>
          Thống kê
        </li>
        <li>Cài đặt</li>
        <li>Đăng xuất</li>

      </ul>
    </div>
  );
}
