import { useState } from "react";
import "../styles/book.css";

export default function PublisherModal({ publisher, onClose }) {
  const [form, setForm] = useState({
    name: publisher?.name || "",
    address: publisher?.address || "",
    email: publisher?.email || "",
    phone: publisher?.phone || "",
  });

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        {/* HEADER */}
        <div className="modal-header">
          <h3>{publisher ? "Sửa nhà xuất bản" : "Thêm nhà xuất bản"}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div className="modal-body">

          <label>Tên NXB</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <label>Địa chỉ</label>
          <input
            className="input"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
          />

          <label>Email</label>
          <input
            className="input"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <label>Điện thoại</label>
          <input
            className="input"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />

        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn grey" onClick={onClose}>Hủy</button>
          <button className="btn primary">
            {publisher ? "Lưu thay đổi" : "Thêm mới"}
          </button>
        </div>

      </div>
    </div>
  );
}
