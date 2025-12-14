import { useState } from "react";
import "../styles/book.css";
import PublisherModal from "./PublisherModal";

export default function PublisherList() {
  const [openModal, setOpenModal] = useState(false);
  const [editPublisher, setEditPublisher] = useState(null);

  // Dữ liệu mẫu
  const publishers = [
    {
      id: 1,
      name: "NXB Kim Đồng",
      address: "Hà Nội",
      email: "kimdong@gmail.com",
      phone: "0901234567",
    },
    {
      id: 2,
      name: "NXB Trẻ",
      address: "TP. Hồ Chí Minh",
      email: "nxbtre@gmail.com",
      phone: "0988112233",
    },
    {
      id: 3,
      name: "NXB Giáo Dục",
      address: "Hà Nội",
      email: "giaoduc@gmail.com",
      phone: "0974556688",
    },

     {
      id: 4,
      name: "NXB Hà Nội",
      address: "Hà Nội",
      email: "HaNoi@gmail.com",
      phone: "0974556689",
    },

     {
      id: 3,
      name: "NXB Tiểu Trẻ",
      address: "TP Huế",
      email: "TieuTrec@gmail.com",
      phone: "0974558899",
    },
  ];

  return (
    <div className="book-container">

      {/* HEADER */}
      <div className="book-header">
        <h2 className="page-title">
          🏢 Quản lý nhà xuất bản
        </h2>

        <button className="btn primary" onClick={() => setOpenModal(true)}>
          ➕ Thêm nhà xuất bản
        </button>
      </div>

      {/* TABLE */}
      <div className="book-card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên NXB</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {publishers.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.address}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>

                <td>
                  <button
                    className="btn yellow small"
                    onClick={() => {
                      setEditPublisher(p);
                      setOpenModal(true);
                    }}
                  >
                    ✏️
                  </button>

                  <button className="btn red small" style={{ marginLeft: 6 }}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {openModal && (
        <PublisherModal
          publisher={editPublisher}
          onClose={() => {
            setOpenModal(false);
            setEditPublisher(null);
          }}
        />
      )}
    </div>
  );
}
