import { useState } from "react";
import "../styles/reader.css";

export default function ReaderList() {
  const [readers, setReaders] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "vana@gmail.com",
      phone: "0912345678",
      address: "Hà Nội",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "thib@gmail.com",
      phone: "0901112222",
      address: "TP. Hồ Chí Minh",
      status: "inactive",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "vanc@gmail.com",
      phone: "0935558888",
      address: "Đà Nẵng",
      status: "active",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editReader, setEditReader] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  });

  const openAdd = () => {
    setEditReader(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "active",
    });
    setModalOpen(true);
  };

  const openEdit = (reader) => {
    setEditReader(reader);
    setForm(reader);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const saveReader = () => {
    if (!form.name.trim()) {
      alert("Tên không được để trống!");
      return;
    }

    if (editReader) {
      setReaders(
        readers.map((r) =>
          r.id === editReader.id ? { ...r, ...form } : r
        )
      );
    } else {
      setReaders([
        ...readers,
        { id: readers.length + 1, ...form },
      ]);
    }

    setModalOpen(false);
  };

  const deleteReader = (id) => {
    if (window.confirm("Xóa độc giả này?")) {
      setReaders(readers.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="reader-page">

      <div className="header-section">
        <h2><i className="bi bi-people-fill me-2"></i> Quản lý độc giả</h2>

        <button className="add-btn" onClick={openAdd}>
          <i className="bi bi-plus-circle"></i> Thêm độc giả
        </button>
      </div>

      {/* TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên độc giả</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th style={{ width: 120 }}>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {readers.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.phone}</td>
                <td>{r.address}</td>
                <td>
                  {r.status === "active" ? (
                    <span className="badge bg-green">Hoạt động</span>
                  ) : (
                    <span className="badge bg-gray">Không hoạt động</span>
                  )}
                </td>

                <td>
                  <button className="btn-edit" onClick={() => openEdit(r)}>
                    ✏
                  </button>
                  <button className="btn-del" onClick={() => deleteReader(r.id)}>
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">

            <div className="modal-header">
              <h3>{editReader ? "Chỉnh sửa độc giả" : "Thêm độc giả"}</h3>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              <label className="label">Tên độc giả</label>
              <input
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <label className="label">Email</label>
              <input
                className="input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <label className="label">Điện thoại</label>
              <input
                className="input"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <label className="label">Địa chỉ</label>
              <input
                className="input"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <label className="label">Trạng thái</label>
              <select
                className="input"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="btn cancel" onClick={closeModal}>Hủy</button>
              <button className="btn save" onClick={saveReader}>Lưu</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
