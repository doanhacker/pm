// BookModal.jsx
import { useState, useEffect } from "react";
import "../styles/book.css";

export default function BookModal({
  book,
  onClose,
  showReservations = false,
  reservations = []
}) {
  // FORM SÁCH
  const [form, setForm] = useState({
    title: book?.title || "",
    author: book?.author || "",
    category: book?.category || "",
    publisher: book?.publisher || "",
    quantity: book?.quantity || 0,
    position: book?.position || "",
    price: book?.price || 0,
    desc: book?.desc || ""
  });

  // TRẠNG THÁI FORM THÊM ĐỘC GIẢ
  const [showAddForm, setShowAddForm] = useState(false);

  // DANH SÁCH ĐẶT TRƯỚC LOCAL
  const [localReservations, setLocalReservations] = useState(reservations);

  // DANH SÁCH ĐỘC GIẢ CÓ SẴN (demo)
  const sampleReaders = [
    { id: 1, name: "Nguyễn Văn A", phone: "0123456789" },
    { id: 2, name: "Trần Thị B", phone: "0987654321" },
    { id: 3, name: "Lê Văn C", phone: "0912345678" }
  ];

  // STATE CHỌN ĐỘC GIẢ CÓ SẴN + FORM ĐỘC GIẢ MỚI
  const [selectedReaderId, setSelectedReaderId] = useState("");
  const [newRes, setNewRes] = useState({ name: "", phone: "", date: "" });

  useEffect(() => {
    setForm({
      title: book?.title || "",
      author: book?.author || "",
      category: book?.category || "",
      publisher: book?.publisher || "",
      quantity: book?.quantity || 0,
      position: book?.position || "",
      price: book?.price || 0,
      desc: book?.desc || ""
    });
  }, [book]);

  useEffect(() => {
    setLocalReservations(reservations);
  }, [reservations]);

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // ==========================
  // THÊM ĐỘC GIẢ CÓ SẴN
  // ==========================
  const handleAddExistingReader = () => {
    if (!selectedReaderId || !newRes.date) return;

    const reader = sampleReaders.find(r => r.id == selectedReaderId);
    if (!reader) return;

    const item = {
      id: localReservations.length + 1,
      name: reader.name,
      phone: reader.phone,
      date: newRes.date
    };

    setLocalReservations([...localReservations, item]);
    setSelectedReaderId("");
    setNewRes({ name: "", phone: "", date: "" });
    setShowAddForm(false);
  };

  // ==========================
  // THÊM ĐỘC GIẢ MỚI
  // ==========================
  const handleAddNewReader = () => {
    if (!newRes.name || !newRes.phone || !newRes.date) return;

    const item = {
      id: localReservations.length + 1,
      name: newRes.name,
      phone: newRes.phone,
      date: newRes.date
    };

    setLocalReservations([...localReservations, item]);

    setNewRes({ name: "", phone: "", date: "" });
    setShowAddForm(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" style={{ width: "950px", maxWidth: "100vw" }}>

        {/* HEADER */}
        <div className="modal-header">
          <h3>
            {showReservations
              ? `Độc giả đặt trước — ${book?.title || ""}`
              : book
              ? "Sửa sách"
              : "Thêm sách"}
          </h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          {showReservations ? (
            <>
              {/* TIÊU ĐỀ + NÚT THÊM */}
              <div className="reserv-header">
                <h4>Danh sách độc giả đặt trước</h4>

                <button
                  className="btn primary small"
                  onClick={() => setShowAddForm(true)}
                >
                  + Thêm độc giả
                </button>
              </div>

              {/* FORM THÊM ĐỘC GIẢ */}
              {showAddForm && (
                <div className="add-form">

                  {/* CHỌN ĐỘC GIẢ CÓ SẴN */}
                  <label>Chọn độc giả</label>
                  <select
                    className="input"
                    value={selectedReaderId}
                    onChange={(e) => setSelectedReaderId(e.target.value)}
                  >
                    <option value="">-- Chọn độc giả --</option>
                    {sampleReaders.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.phone})
                      </option>
                    ))}
                  </select>

                  {/* NGÀY ĐẶT */}
                  <label>Ngày đặt</label>
                  <input
                    type="date"
                    className="input"
                    value={newRes.date}
                    onChange={(e) =>
                      setNewRes({ ...newRes, date: e.target.value })
                    }
                  />

                  {/* NÚT LƯU ĐỘC GIẢ CÓ SẴN */}
                  {selectedReaderId && (
                    <button
                      className="btn primary"
                      style={{ marginTop: 10 }}
                      onClick={handleAddExistingReader}
                    >
                      Thêm độc giả đã có
                    </button>
                  )}

                  <hr style={{ margin: "15px 0" }} />

                  {/* FORM THÊM ĐỘC GIẢ MỚI */}
                  <h4>Thêm độc giả mới</h4>

                  <label>Tên độc giả</label>
                  <input
                    className="input"
                    value={newRes.name}
                    onChange={(e) =>
                      setNewRes({ ...newRes, name: e.target.value })
                    }
                  />

                  <label>Điện thoại</label>
                  <input
                    className="input"
                    value={newRes.phone}
                    onChange={(e) =>
                      setNewRes({ ...newRes, phone: e.target.value })
                    }
                  />

                  <button
                    className="btn primary"
             
                    onClick={handleAddNewReader}
                  >
                    Tạo độc giả mới
                  </button>

                  <button
                    className="btn grey"
                    style={{ marginLeft:8 }}
                    onClick={() => setShowAddForm(false)}
                  >
                    Hủy
                  </button>
                </div>
              )}

              {/* BẢNG DANH SÁCH */}
              {localReservations.length > 0 ? (
                <table className="styled-table small-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên độc giả</th>
                      <th>Điện thoại</th>
                      <th>Ngày đặt</th>
                      <th className="text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localReservations.map((r, idx) => (
                      <tr key={r.id || idx}>
                        <td>{idx + 1}</td>
                        <td>{r.name}</td>
                        <td>{r.phone}</td>
                        <td>{r.date}</td>
                        <td style={{ textAlign: "right" }}>
                          <button className="btn grey small">Xác nhận</button>
                          <button
                            className="btn red small"
                            style={{ marginLeft: 8 }}
                          >
                            Hủy
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ marginTop: 10 }}>
                  Hiện không có độc giả đặt trước cho quyển sách này.
                </p>
              )}
            </>
          ) : (
            <>
              {/* FORM SÁCH */}
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
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn grey" onClick={onClose}>
            Đóng
          </button>

          {!showReservations && (
            <button className="btn primary">
              {book ? "Lưu thay đổi" : "Thêm mới"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
