import { useState } from "react";
import "../styles/book.css";
import AuthorModal from "./AuthorModal";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function AuthorList() {
  const [openModal, setOpenModal] = useState(false);
  const [editAuthor, setEditAuthor] = useState(null);

  // Dữ liệu mẫu
  const authors = [
    {
      id: 1,
      name: "J.K. Rowling",
      country: "Anh",
      bio: "Tác giả nổi tiếng với bộ truyện Harry Potter.",
      style: "Kỳ ảo, phiêu lưu",
      famousWorks: "Harry Potter, Fantastic Beasts"
    },
    {
      id: 2,
      name: "Nguyễn Nhật Ánh",
      country: "Việt Nam",
      bio: "Một trong những nhà văn thiếu nhi nổi tiếng nhất Việt Nam.",
      style: "Thiếu nhi, cảm xúc, đời thường",
      famousWorks: "Mắt Biếc, Cho Tôi Xin Một Vé Đi Tuổi Thơ"
    },
    {
      id: 3,
      name: "Stephen Hawking",
      country: "Anh",
      bio: "Nhà vật lý lý thuyết nổi tiếng, tác giả nhiều cuốn sách vũ trụ học.",
      style: "Khoa học, vũ trụ, triết học",
      famousWorks: "Lược Sử Thời Gian, Vũ Trụ Trong Vỏ Hạt Dẻ"
    },
     {
      id: 4,
      name: "Đoàn Giỏi",
      country: "Việt Nam",
      bio: "Nhà vật lý lý thuyết nổi tiếng, tác giả nhiều cuốn sách vũ trụ học.",
      style: "Khoa học, vũ trụ, triết học",
      famousWorks: "Lược Sử Thời Gian, Vũ Trụ Trong Vỏ Hạt Dẻ"
    },
     {
      id: 5,
      name: "Trung Nguyễn",
      country: "Canada",
      bio: "Nhà vật lý lý thuyết nổi tiếng, tác giả nhiều cuốn sách vũ trụ học.",
      style: "Khoa học, vũ trụ, triết học",
      famousWorks: "Lược Sử Thời Gian, Vũ Trụ Trong Vỏ Hạt Dẻ"
    }
  ];

  return (
    <div className="book-container">

      {/* --- HEADER --- */}
      <div className="book-header">
        <h2 className="page-title">
          ✍️ Tác giả
        </h2>

        <button className="btn primary" onClick={() => setOpenModal(true)}>
          ➕ Thêm tác giả
        </button>
      </div>

      {/* --- TABLE --- */}
      <div className="book-card">
        <table className="styled-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Tên tác giả</th>
              <th>Quốc gia</th>
              <th>Tiểu sử</th>
              <th>Phong cách sáng tác</th>
              <th>Tác phẩm tiêu biểu</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {authors.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>

                <td>{a.name}</td>

                <td>{a.country}</td>

                <td className="desc">{a.bio}</td>

                <td>{a.style}</td>

                <td className="desc">{a.famousWorks}</td>

                <td className="button-col">
                  <div className="action-row">
                    <button
                      className="btn yellow small action-btn"
                      onClick={() => {
                        setEditAuthor(a);
                        setOpenModal(true);
                      }}
                      title="Chỉnh sửa"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      className="btn red small action-btn"
                      title="Xóa"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* --- MODAL --- */}
      {openModal && (
        <AuthorModal
          author={editAuthor}
          onClose={() => {
            setOpenModal(false);
            setEditAuthor(null);
          }}
        />
      )}

    </div>
  );
}
