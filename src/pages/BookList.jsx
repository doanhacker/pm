// BookList.jsx
import { useState } from "react";
import "../styles/book.css";
import BookModal from "./BookModal";

export default function BookList() {
  const [openModal, setOpenModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [showReservations, setShowReservations] = useState(false);
  const [currentReservations, setCurrentReservations] = useState([]);

  const books = [
    { id: 1, title: "Harry Potter", author: "J.K. Rowling", category: "Tiểu thuyết", publisher: "NXB Trẻ", quantity: 10, position: "Kệ A1", price: 10000, desc: "Câu chuyện về thế giới phù thủy..." },
    { id: 2, title: "Doraemon", author: "Nguyễn Nhật Ánh", category: "Thiếu nhi", publisher: "NXB Kim Đồng", quantity: 15, position: "Kệ C3", price: 5000, desc: "Bộ truyện nổi tiếng về chú mèo máy..." },
    { id: 3, title: "Lược Sử Thời Gian", author: "Stephen Hawking", category: "Khoa học", publisher: "NXB Giáo Dục", quantity: 7, position: "Kệ B2", price: 15000, desc: "Cuốn sách kinh điển về vũ trụ..." },
    { id: 4, title: "Lập trình Java nâng cao ", author: "J.K. Rowling", category: "Tiểu thuyết", publisher: "NXB Trẻ", quantity: 0, position: "Kệ A3", price: 10000, desc: "Cuốn sách đem lại các kiến thức nâng cao về lập trình..." }
  ];

  // Dữ liệu đặt trước (mẫu). Key là book.id
  const reservations = {
    4: [
      { id: 1, name: "Nguyễn Văn A", phone: "0123456789", date: "2025-11-30" },
      { id: 2, name: "Trần Thị B", phone: "0987654321", date: "2025-12-01" },
      { id: 3, name: "Trần Thị B", phone: "0987654321", date: "2025-12-01" },
      { id: 4, name: "Trần Thị B", phone: "0987654321", date: "2025-12-01" }
    ]
    // nếu có sách khác có đặt trước thì thêm ở đây
  };

  const openEditModal = (book) => {
    setEditBook(book);
    setShowReservations(false);
    setOpenModal(true);
  };

  const openReservationsModal = (book) => {
    setEditBook(book);
    setCurrentReservations(reservations[book.id] || []);
    setShowReservations(true);
    setOpenModal(true);
  };

  return (
    <div className="book-container">
      <div className="book-header">
        <h2 className="page-title"><span className="icon">📚</span> Quản lý sách</h2>
        <button className="btn primary" onClick={() => { setEditBook(null); setShowReservations(false); setOpenModal(true); }}>
          ➕ Thêm sách
        </button>
      </div>

      <div className="book-card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th><th>Tên sách</th><th>Tác giả</th><th>Thể loại</th><th>NXB</th><th>Số lượng</th><th>Vị trí</th><th>Giá thuê (đ)</th><th>Giới thiệu</th><th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {books.map((b) => (
              <tr key={b.id} className={b.quantity === 0 ? "out-of-stock-row" : ""}>
                <td>{b.id}</td>

                <td>
                  {b.quantity === 0 ? (
                    // Nếu hết sách thì tiêu đề là nút bấm để mở modal danh sách đặt trước
                    <button
                      className="link-button"
                      title="Xem danh sách đặt trước"
                      onClick={() => openReservationsModal(b)}
                    >
                      {b.title} <span className="badge">Hết hàng</span>
                    </button>
                  ) : (
                    b.title
                  )}
                </td>

                <td>{b.author}</td>
                <td>{b.category}</td>
                <td>{b.publisher}</td>
                <td>{b.quantity}</td>
                <td>{b.position}</td>
                <td>{b.price.toLocaleString()}đ</td>

                <td className="desc">{b.desc.length > 50 ? b.desc.substring(0, 50) + "..." : b.desc}</td>

                <td className="button-col">
                  <button className="btn yellow small" onClick={() => openEditModal(b)}>✏️</button>
                  <button className="btn red small">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openModal && (
        <BookModal
          book={editBook}
          onClose={() => { setOpenModal(false); setEditBook(null); setShowReservations(false); setCurrentReservations([]); }}
          showReservations={showReservations}
          reservations={currentReservations}
        />
      )}
    </div>
  );
}
