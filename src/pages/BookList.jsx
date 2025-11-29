import { useState } from "react";
import "../styles/book.css";
import BookModal from "./BookModal";

export default function BookList() {
  const [openModal, setOpenModal] = useState(false);
  const [editBook, setEditBook] = useState(null);

  const books = [
    {
      id: 1,
      title: "Harry Potter",
      author: "J.K. Rowling",
      category: "Tiểu thuyết",
      publisher: "NXB Trẻ",
      quantity: 10,
      position: "Kệ A1",
      price: 10000,
      desc: "Câu chuyện về thế giới phù thủy và hành trình của cậu bé Harry Potter."
    },
    {
      id: 2,
      title: "Doraemon",
      author: "Nguyễn Nhật Ánh",
      category: "Thiếu nhi",
      publisher: "NXB Kim Đồng",
      quantity: 15,
      position: "Kệ C3",
      price: 5000,
      desc: "Bộ truyện nổi tiếng về chú mèo máy Doraemon và Nobita."
    },
    {
      id: 3,
      title: "Lược Sử Thời Gian",
      author: "Stephen Hawking",
      category: "Khoa học",
      publisher: "NXB Giáo Dục",
      quantity: 7,
      position: "Kệ B2",
      price: 15000,
      desc: "Cuốn sách kinh điển về vũ trụ, vật lý và thuyết Big Bang."
    }
  ];

  return (
    <div className="book-container">

      {/* Header */}
      <div className="book-header">
        <h2 className="page-title">
          <span className="icon">📚</span> Quản lý sách
        </h2>

        <button className="btn primary" onClick={() => setOpenModal(true)}>
          ➕ Thêm sách
        </button>
      </div>

      {/* Table */}
      <div className="book-card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Thể loại</th>
              <th>NXB</th>
              <th>Số lượng</th>
              <th>Vị trí</th>
              <th>Giá thuê (đ)</th>
              <th>Giới thiệu</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.category}</td>
                <td>{b.publisher}</td>
                <td>{b.quantity}</td>
                <td>{b.position}</td>
                <td>{b.price.toLocaleString()}đ</td>

                <td className="desc">
                  {b.desc.length > 50 ? b.desc.substring(0, 50) + "..." : b.desc}
                </td>

                <td className="button-col">
                  <button
                    className="btn yellow small"
                    onClick={() => {
                      setEditBook(b);
                      setOpenModal(true);
                    }}
                  >
                    ✏️
                  </button>

                  <button className="btn red small">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openModal && (
        <BookModal
          book={editBook}
          onClose={() => {
            setOpenModal(false);
            setEditBook(null);
          }}
        />
      )}
    </div>
  );
}
