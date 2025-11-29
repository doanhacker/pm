import { useState } from "react";
import "../styles/book.css";

export default function AuthorModal({ author, onClose }) {
  const [form, setForm] = useState({
    name: author?.name || "",
    country: author?.country || "",
    bio: author?.bio || "",
    style: author?.style || "",
    famousWorks: author?.famousWorks || "",
  });

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <div className="modal-header">
          <h3>{author ? "Sửa tác giả" : "Thêm tác giả"}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">

          <label>Tên tác giả</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <label>Quốc gia</label>
          <input
            className="input"
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
          />

          <label>Tiểu sử / Đặc điểm</label>
          <textarea
            className="input textarea"
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
          ></textarea>

          <label>Phong cách sáng tác</label>
          <input
            className="input"
            value={form.style}
            onChange={(e) => updateField("style", e.target.value)}
          />

          <label>Tác phẩm tiêu biểu</label>
          <textarea
            className="input textarea"
            value={form.famousWorks}
            onChange={(e) => updateField("famousWorks", e.target.value)}
          ></textarea>
        </div>

        <div className="modal-footer">
          <button className="btn grey" onClick={onClose}>Hủy</button>
          <button className="btn primary">
            {author ? "Lưu thay đổi" : "Thêm mới"}
          </button>
        </div>

      </div>
    </div>
  );
}
