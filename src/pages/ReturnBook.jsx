import { useState } from "react";
import "../styles/return.css";

const sampleReaders = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com" },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com" },
];

const sampleBorrow = [
  {
    id: 101,
    readerId: 1,
    items: [
      { bookId: 1, title: "Harry Potter", quantity: 2, returnDate: "2024-12-05", price: 15000 },
      { bookId: 3, title: "Lược Sử Thời Gian", quantity: 1, returnDate: "2024-12-10", price: 20000 },
    ],
  },
  {
    id: 102,
    readerId: 2,
    items: [
      { bookId: 4, title: "Sherlock Holmes", quantity: 1, returnDate: "2024-11-30", price: 12000 },
    ],
  },
];

export default function ReturnBook() {
  const today = new Date().toISOString().split("T")[0];

  const [returnId] = useState("PT" + Math.floor(Math.random() * 9000 + 1000));
  const [selectedReader, setSelectedReader] = useState("");
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [onlineType, setOnlineType] = useState("");

  const handleChooseBook = (book) => {
    if (selectedItems.some((b) => b.bookId === book.bookId)) {
      setSelectedItems(selectedItems.filter((b) => b.bookId !== book.bookId));
    } else {
      const returnDate = new Date(book.returnDate);
      const now = new Date();

      const late = now > returnDate;
      const damage = "none";

      setSelectedItems([
        ...selectedItems,
        { ...book, late, damage },
      ]);
    }
  };

  // ---------------------------------------------
  //  TÍNH TIỀN
  // ---------------------------------------------
  const calculateTotal = () => {
    let total = 0;

    selectedItems.forEach((b) => {
      // phí trễ hạn
      if (b.late) total += 5000;

      // phí hỏng
      if (b.damage === "damaged") total += 20000;

      // phí mất sách
      if (b.damage === "lost") total += 100000;
    });

    return total;
  };

  const violationsList = () => {
    let result = [];
    selectedItems.forEach((b) => {
      if (b.late) result.push(`• ${b.title}: Trả muộn (+5.000đ)`);
      if (b.damage === "damaged") result.push(`• ${b.title}: Hư hỏng (+20.000đ)`);
      if (b.damage === "lost") result.push(`• ${b.title}: Mất sách (+100.000đ)`);
    });
    return result.length ? result : ["Không"];
  };

  const confirmPayment = () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (paymentMethod === "online" && !onlineType) {
      alert("Vui lòng chọn loại thanh toán online!");
      return;
    }

    alert("Thanh toán thành công! Trả sách hoàn tất.");
  };

  return (
    <div className="return-container">
      <h2 className="page-title">📕 Trả sách tại quầy</h2>

      <div className="section-box">

        {/* B1: Tạo phiếu */}
        <div className="form-step">
          <h3>1. Tạo phiếu trả</h3>
          <div className="info-box">{returnId} — {today}</div>
        </div>

        {/* B2: Chọn độc giả */}
        <div className="form-step">
          <h3>2. Chọn độc giả</h3>
          <select
            className="input"
            value={selectedReader}
            onChange={(e) => {
              setSelectedReader(e.target.value);
              setSelectedBorrow(null);
              setSelectedItems([]);
            }}
          >
            <option value="">-- Chọn độc giả --</option>
            {sampleReaders.map((r) => (
              <option key={r.id} value={r.id}>{r.name} — {r.email}</option>
            ))}
          </select>
        </div>

        {/* B3: Chọn phiếu mượn */}
        {selectedReader && (
          <div className="form-step">
            <h3>3. Chọn phiếu mượn</h3>

            <select
              className="input"
              onChange={(e) => {
                const br = sampleBorrow.find((b) => b.id === Number(e.target.value));
                setSelectedBorrow(br);
                setSelectedItems([]);
              }}
            >
              <option value="">-- Chọn phiếu mượn --</option>
              {sampleBorrow
                .filter((b) => b.readerId === Number(selectedReader))
                .map((b) => (
                  <option key={b.id} value={b.id}>
                    PM{b.id} — {b.items.length} sách
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* B4: Danh sách sách */}
        {selectedBorrow && (
          <div className="form-step">
            <h3>4. Sách đang mượn</h3>

            <div className="book-list">
              {selectedBorrow.items.map((book) => (
                <div className="book-row" key={book.bookId}>
                  <div>
                    <div className="book-title">{book.title}</div>
                    <div className="small-text">
                      SL: {book.quantity} — Trả hạn: {book.returnDate}
                    </div>
                  </div>

                  <button
                    className={selectedItems.some((b) => b.bookId === book.bookId)
                      ? "btn-red-sm" : "btn-blue-sm"}
                    onClick={() => handleChooseBook(book)}
                  >
                    {selectedItems.some((b) => b.bookId === book.bookId) ? "Bỏ chọn" : "Chọn"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* B5: Vi phạm */}
        {selectedItems.length > 0 && (
          <div className="form-step">
            <h3>5. Vi phạm</h3>
            <div className="violation-box">
              {violationsList().map((v, i) => <div key={i}>{v}</div>)}
            </div>
          </div>
        )}

        {/* B6: Thanh toán */}
        {selectedItems.length > 0 && (
          <div className="form-step">
            <h3>6. Thanh toán</h3>

            <label className="fw-bold">Chọn phương thức:</label>
            <select
              className="input"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">-- Chọn phương thức --</option>
              <option value="cash">Tiền mặt</option>
              <option value="online">Online</option>
            </select>

            {paymentMethod === "online" && (
              <div className="mt-2">
                <label className="fw-bold">Chọn loại online:</label>
                <select
                  className="input"
                  value={onlineType}
                  onChange={(e) => setOnlineType(e.target.value)}
                >
                  <option value="">-- Chọn loại --</option>
                  <option value="bank">Chuyển khoản ngân hàng</option>
                  <option value="visa">Visa / Mastercard</option>
                  <option value="momo">Momo</option>
                </select>

                {/* QR ngân hàng */}
                {onlineType === "bank" && (
                  <div className="qr-box">⚡ QR ngân hàng sẽ hiển thị ở đây</div>
                )}

                {/* Visa */}
                {onlineType === "visa" && (
                  <div className="visa-box">
                    <input className="input" placeholder="Số thẻ" />
                    <input className="input" placeholder="MM/YY" />
                    <input className="input" placeholder="CVV" />
                  </div>
                )}

                {/* Momo */}
                {onlineType === "momo" && (
                  <div className="qr-box">⚡ QR Momo sẽ hiển thị ở đây</div>
                )}
              </div>
            )}

            {/* Tổng tiền */}
            <div className="total-box">
              Tổng tiền: <span className="price">{calculateTotal().toLocaleString()}đ</span>
            </div>

            <button className="btn-confirm" onClick={confirmPayment}>
              Hoàn tất thanh toán
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
