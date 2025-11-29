import { useState } from "react";
import "../styles/book.css";

export default function BookModal({ book, onClose }) {
  const [form, setForm] = useState({
    title: book?.title || "",
    author: book?.author || "",
    category: book?.category || "",
    publisher: book?.publisher || "",
    quantity: book?.quantity || 0,
    position: book?.position || "",
    price: book?.price || 0,
    desc: book?.desc || "",
  });

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        {/* HEADER */}
        <div className="modal-header">
          <h3>{book ? "Sửa sách" : "Thêm sách"}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div className="modal-body">

          <label>Tên sách</label>
          <input
            className="input"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
          />

          <label>Tác giả</label>
          <input
            className="input"
            value={form.author}
            onChange={(e) => updateField("author", e.target.value)}
          />

          <label>Thể loại</label>
          <input
            className="input"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
          />

          <label>NXB</label>
          <input
            className="input"
            value={form.publisher}
            onChange={(e) => updateField("publisher", e.target.value)}
          />

          <label>Số lượng</label>
          <input
            type="number"
            className="input"
            value={form.quantity}
            onChange={(e) => updateField("quantity", e.target.value)}
          />

          <label>Vị trí</label>
          <input
            className="input"
            value={form.position}
            onChange={(e) => updateField("position", e.target.value)}
          />

          <label>Giá thuê (đ)</label>
          <input
            type="number"
            className="input"
            value={form.price}
            onChange={(e) => updateField("price", e.target.value)}
          />

          <label>Giới thiệu</label>
          <textarea
            className="input textarea"
            value={form.desc}
            onChange={(e) => updateField("desc", e.target.value)}
          ></textarea>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn grey" onClick={onClose}>Hủy</button>
          <button className="btn primary">
            {book ? "Lưu thay đổi" : "Thêm mới"}
          </button>
        </div>

      </div>
    </div>
  );
}
