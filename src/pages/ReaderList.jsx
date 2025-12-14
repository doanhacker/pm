import { useState, useMemo } from "react";
import "../styles/reader.css";
import { FiPlus, FiEdit2, FiTrash2, FiRefreshCw, FiSearch } from "react-icons/fi";

export default function ReaderList() {
  const [readers, setReaders] = useState([
    {
      id: 1,
      maDocGia: "DG0001",
      name: "Nguyễn Văn A",
      email: "vana@gmail.com",
      phone: "0912345678",
      address: "Hà Nội",
      cardStatus: "active", // active | expired | locked
      issueDate: "2024-01-01",
      expiryDate: "2025-01-01",
      hasAccount: true,
    },
    {
      id: 2,
      maDocGia: "DG0002",
      name: "Trần Thị B",
      email: "",
      phone: "0901112222",
      address: "TP. Hồ Chí Minh",
      cardStatus: "expired",
      issueDate: "2023-01-01",
      expiryDate: "2024-01-01",
      hasAccount: false,
    },
     {
      id: 3,
      maDocGia: "DG0003",
      name: "Nguyễn Thành Trung",
      email: "trung@gmail.com",
      phone: "0912345678",
      address: "Hà Nội",
      cardStatus: "active", // active | expired | locked
      issueDate: "2024-01-01",
      expiryDate: "2025-01-01",
      hasAccount: true,
    },
     {
      id: 4,
      maDocGia: "DG0004",
      name: "Nguyễn Nhật Quang",
      email: "",
      phone: "0912345678",
      address: "Hà Nội",
      cardStatus: "locked", // active | expired | locked
      issueDate: "2024-01-01",
      expiryDate: "2025-01-01",
      hasAccount: true,
    },
     {
      id: 5,
      maDocGia: "DG0005",
      name: "Đào Trọng Đoàn",
      email: "doan@gmail.com",
      phone: "0912345678",
      address: "Hà Nội",
      cardStatus: "active", // active | expired | locked
      issueDate: "2024-01-01",
      expiryDate: "2025-01-01",
      hasAccount: true,
    },
     {
      id: 6,
      maDocGia: "DG0006",
      name: "Ngô Việt Hoàng",
      email: "hoang@gmail.com",
      phone: "0912345678",
      address: "Hà Nội",
      cardStatus: "active", // active | expired | locked
      issueDate: "2024-01-01",
      expiryDate: "2025-01-01",
      hasAccount: true,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editReader, setEditReader] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    hasAccount: false,
  });

  const [query, setQuery] = useState("");

  /* =========================
     MODAL CONTROL
  ========================= */
  const openAdd = () => {
    setEditReader(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      hasAccount: false,
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

  /* =========================
     SAVE / REGISTER CARD
  ========================= */
  const saveReader = () => {
    if (!form.name.trim()) {
      alert("Tên độc giả không được để trống!");
      return;
    }

    if (form.hasAccount && !form.email.trim()) {
      alert("Cần email để tạo tài khoản web!");
      return;
    }

    const today = new Date();
    const expiry = new Date();
    expiry.setFullYear(today.getFullYear() + 1);

    if (editReader) {
      setReaders(
        readers.map((r) =>
          r.id === editReader.id
            ? { ...r, ...form }
            : r
        )
      );
    } else {
      setReaders([
        ...readers,
        {
          id: readers.length + 1,
          maDocGia: `DG${String(readers.length + 1).padStart(4, "0")}`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          hasAccount: form.hasAccount,
          issueDate: today.toISOString().slice(0, 10),
          expiryDate: expiry.toISOString().slice(0, 10),
          cardStatus: "active",
        },
      ]);
    }

    setModalOpen(false);
  };

  /* =========================
     RENEW CARD
  ========================= */
  const renewCard = (id) => {
    const confirmRenew = window.confirm(
      "Gia hạn thẻ thêm 12 tháng?"
    );
    if (!confirmRenew) return;

    setReaders(
      readers.map((r) => {
        if (r.id === id) {
          const newExpiry = new Date();
          newExpiry.setFullYear(newExpiry.getFullYear() + 1);

          return {
            ...r,
            expiryDate: newExpiry.toISOString().slice(0, 10),
            cardStatus: "active",
          };
        }
        return r;
      })
    );

    alert("Gia hạn thẻ thành công!");
  };

  const deleteReader = (id) => {
    if (window.confirm("Xóa độc giả này?")) {
      setReaders(readers.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="reader-page">

      <div className="header-section">
        <div>
          <h2 className="page-title">Quản lý độc giả</h2>
          <div className="subtitle">Quản lý thẻ độc giả, gia hạn và tài khoản website</div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              placeholder="Tìm theo tên, mã thẻ hoặc email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={openAdd} title="Đăng ký thẻ">
            <FiPlus style={{ marginRight: 8 }} /> Đăng ký
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-box">
        <div className="table-topline">
          <div className="count">Tổng: {readers.length} độc giả</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã thẻ</th>
              <th>Tên độc giả</th>
              <th>Email</th>
              <th>Ngày hết hạn</th>
              <th>Trạng thái thẻ</th>
              <th>Web</th>
              <th style={{ width: 140 }}>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {(() => {
              const filtered = readers.filter((r) => {
                if (!query.trim()) return true;
                const q = query.toLowerCase();
                return (
                  String(r.maDocGia).toLowerCase().includes(q) ||
                  String(r.name).toLowerCase().includes(q) ||
                  String(r.email || "").toLowerCase().includes(q)
                );
              });

              return filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.maDocGia}</td>
                  <td>{r.name}</td>
                  <td>{r.email || "-"}</td>
                  <td>{r.expiryDate}</td>

                  <td>
                    {r.cardStatus === "active" && (
                      <span className="badge bg-green">Hoạt động</span>
                    )}
                    {r.cardStatus === "expired" && (
                      <span className="badge bg-orange">Hết hạn</span>
                    )}
                    {r.cardStatus === "locked" && (
                      <span className="badge bg-red">Bị khóa</span>
                    )}
                  </td>

                  <td>
                    {r.hasAccount ? (
                      <span className="badge bg-blue">Có</span>
                    ) : (
                      <span className="badge bg-gray">Không</span>
                    )}
                  </td>

                  <td className="button-col">
                    <div className="action-row">
                      <button
                        className="action-btn edit"
                        onClick={() => openEdit(r)}
                        title="Chỉnh sửa"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="action-btn renew"
                        onClick={() => renewCard(r.id)}
                        title="Gia hạn thẻ"
                      >
                        <FiRefreshCw />
                      </button>

                      <button
                        className="action-btn del"
                        onClick={() => deleteReader(r.id)}
                        title="Xóa"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">

            <div className="modal-header">
              <h3>
                {editReader
                  ? "Chỉnh sửa thông tin độc giả"
                  : "Đăng ký thẻ thành viên"}
              </h3>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              <label>Tên độc giả</label>
              <input
                className="input"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <label>Email</label>
              <input
                className="input"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <label>Điện thoại</label>
              <input
                className="input"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <label>Địa chỉ</label>
              <input
                className="input"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={form.hasAccount}
                  onChange={(e) =>
                    setForm({ ...form, hasAccount: e.target.checked })
                  }
                />
                Tạo tài khoản đăng nhập website
              </label>
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
