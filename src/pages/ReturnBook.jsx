import { useState, useEffect } from "react";
import "../styles/return.css";

/* =======================
   DỮ LIỆU MẪU
======================= */
const sampleReaders = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com" },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com" },
  { id: 3, name: "Nguyễn Thành Trung", email: "trung@gmail.com" },
  { id: 4, name: "Đào Trọng Đoàn", email: "b@gmail.com" },
];

const sampleBorrow = [
  {
    id: 101,
    readerId: 1,
    items: [
      { bookId: 1, title: "Harry Potter", returnDate: "2024-12-05" },
      { bookId: 3, title: "Lược Sử Thời Gian", returnDate: "2024-12-10" },
    ],
  },
  {
    id: 102,
    readerId: 2,
    items: [
      { bookId: 4, title: "Sherlock Holmes", returnDate: "2024-11-30" },
    ],
  },
  // Phiếu mượn mẫu cho độc giả cuối (3 và 4) — mỗi phiếu gồm 3 sách
  {
    id: 103,
    readerId: 3,
    items: [
      { bookId: 5, title: "Bí Kíp Lập Trình", returnDate: "2025-01-10" },
      { bookId: 6, title: "Hành Trình Về Phương Đông", returnDate: "2025-01-15" },
      { bookId: 7, title: "Ngôn Ngữ Lập Trình Cơ Bản", returnDate: "2025-01-20" },
    ],
  },
  {
    id: 104,
    readerId: 4,
    items: [
      { bookId: 8, title: "Thiết Kế Web", returnDate: "2025-01-12" },
      { bookId: 9, title: "Cấu Trúc Dữ Liệu", returnDate: "2025-01-18" },
      { bookId: 10, title: "Kiến Trúc Máy Tính", returnDate: "2025-01-22" },
    ],
  },
];

export default function ReturnBook() {
  const today = new Date().toISOString().split("T")[0];

  /* =======================
     STATE
  ======================= */
  const [returnReceipts, setReturnReceipts] = useState(() => {
    try {
      const raw = localStorage.getItem("returnReceipts");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  });

  const [returnId, setReturnId] = useState(
    "PT" + Math.floor(Math.random() * 9000 + 1000)
  );

  const [selectedReader, setSelectedReader] = useState("");
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [onlineType, setOnlineType] = useState("");

  /* =======================
     CHỌN SÁCH TRẢ
  ======================= */
  const handleChooseBook = (book) => {
    if (selectedItems.some((b) => b.bookId === book.bookId)) {
      setSelectedItems(selectedItems.filter((b) => b.bookId !== book.bookId));
    } else {
      const late = new Date() > new Date(book.returnDate);

      setSelectedItems([
        ...selectedItems,
        { ...book, late, damage: "none" },
      ]);
    }
  };

  const deleteReceipt = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phiếu trả này?")) return;
    setReturnReceipts((prev) => {
      const next = prev.filter((r) => r.id !== id);
      try {
        localStorage.setItem("returnReceipts", JSON.stringify(next));
      } catch (err) {}
      return next;
    });
  };

  /* =======================
     TÍNH PHÍ
  ======================= */
  const calculateItemFee = (b) => {
    let fee = 0;
    if (b.late) fee += 5000;
    if (b.damage === "damaged") fee += 20000;
    if (b.damage === "lost") fee += 100000;
    return fee;
  };

  const calculateTotal = () =>
    selectedItems.reduce((sum, b) => sum + calculateItemFee(b), 0);

  /* =======================
     XÁC NHẬN THANH TOÁN
  ======================= */
  const confirmPayment = () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (paymentMethod === "online" && !onlineType) {
      alert("Vui lòng chọn loại thanh toán online!");
      return;
    }

    const receipt = {
      id: returnId,
      date: today,
      readerName: sampleReaders.find(
        (r) => r.id === Number(selectedReader)
      )?.name,
      borrowId: selectedBorrow.id,
      items: selectedItems.map((b) => ({
        title: b.title,
        late: b.late,
        damage: b.damage,
        fee: calculateItemFee(b),
      })),
      total: calculateTotal(),
      paymentMethod:
        paymentMethod === "cash"
          ? "Tiền mặt"
          : `Online - ${onlineType}`,
    };

    setReturnReceipts((prev) => {
      const next = [receipt, ...prev];
      try {
        localStorage.setItem("returnReceipts", JSON.stringify(next));
      } catch (err) {}
      return next;
    });

    alert("Trả sách thành công – Phiếu trả đã được tạo!");

    // Reset form
    setSelectedReader("");
    setSelectedBorrow(null);
    setSelectedItems([]);
    setPaymentMethod("");
    setOnlineType("");
    setReturnId("PT" + Math.floor(Math.random() * 9000 + 1000));
  };

  return (
    <div className="return-container">
      <h2 className="page-title">📕 Trả sách tại quầy</h2>

      <div className="section-box">

        

        {/* 1. PHIẾU TRẢ */}
        <div className="form-step">
          <h3>1. Tạo phiếu trả</h3>
          <div className="info-box">
            {returnId} — {today}
          </div>
        </div>

        {/* 2. ĐỘC GIẢ */}
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
              <option key={r.id} value={r.id}>
                {r.name} — {r.email}
              </option>
            ))}
          </select>
        </div>

        {/* 3. PHIẾU MƯỢN */}
        {selectedReader && (
          <div className="form-step">
            <h3>3. Chọn phiếu mượn</h3>
            <select
              className="input"
              onChange={(e) => {
                const br = sampleBorrow.find(
                  (b) => b.id === Number(e.target.value)
                );
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

        {/* 4. SÁCH */}
        {selectedBorrow && (
          <div className="form-step">
            <h3>4. Sách đang mượn</h3>

            <div className="book-list">
              {selectedBorrow.items.map((book) => (
                <div className="book-row" key={book.bookId}>
                  <div>
                    <div className="book-title">{book.title}</div>
                    <div className="small-text">
                      Hạn trả: {book.returnDate}
                    </div>
                  </div>

                  <button
                    className={
                      selectedItems.some(
                        (b) => b.bookId === book.bookId
                      )
                        ? "btn-red-sm"
                        : "btn-blue-sm"
                    }
                    onClick={() => handleChooseBook(book)}
                  >
                    {selectedItems.some(
                      (b) => b.bookId === book.bookId
                    )
                      ? "Bỏ chọn"
                      : "Chọn"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. VI PHẠM */}
        {selectedItems.length > 0 && (
          <div className="form-step">
            <h3>5. Ghi nhận vi phạm</h3>

            {selectedItems.map((b) => (
              <div key={b.bookId} className="violation-row">
                <strong>{b.title}</strong>

                <select
                  className="input-sm"
                  value={b.damage}
                  onChange={(e) =>
                    setSelectedItems(
                      selectedItems.map((x) =>
                        x.bookId === b.bookId
                          ? { ...x, damage: e.target.value }
                          : x
                      )
                    )
                  }
                >
                  <option value="none">Không</option>
                  <option value="damaged">Hư hỏng</option>
                  <option value="lost">Mất sách</option>
                </select>
              </div>
            ))}
          </div>
        )}

        {/* 6. THANH TOÁN */}
        {selectedItems.length > 0 && (
          <div className="form-step">
            <h3>6. Thanh toán</h3>

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
              <select
                className="input"
                value={onlineType}
                onChange={(e) => setOnlineType(e.target.value)}
              >
                <option value="">-- Chọn loại online --</option>
                <option value="bank">Chuyển khoản</option>
                <option value="momo">Momo</option>
                <option value="visa">Visa</option>
              </select>
            )}

            <div className="total-box">
              Tổng tiền:{" "}
              <span className="price">
                {calculateTotal().toLocaleString()}đ
              </span>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className="btn-confirm" onClick={confirmPayment}>
                Hoàn tất trả sách
              </button>

              <button
                className="btn-blue-sm"
                onClick={() => alert("Chức năng in chưa được triển khai")}
                title="In phiếu (chưa triển khai)"
              >
                In phiếu
              </button>
            </div>
          </div>
        )}
        
        {/* DANH SÁCH PHIẾU TRẢ (Hiển thị dưới form) */}
        <div className="form-step">
          <h3>Phiếu trả đã ghi nhận</h3>
          {returnReceipts.length > 0 ? (
            returnReceipts.map((r) => (
              <div key={r.id} className="receipt-card">
                <div
                  className="receipt-header"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div>{r.id} — {r.date}</div>
                  <button
                    className="btn-red-sm"
                    onClick={() => deleteReceipt(r.id)}
                    style={{ marginLeft: 12 }}
                  >
                    Xóa
                  </button>
                </div>
                <div className="small-text">
                  Độc giả: <b>{r.readerName}</b> | PM{r.borrowId}
                </div>
                <table className="receipt-table">
                  <thead>
                    <tr>
                      <th>Sách</th>
                      <th>Vi phạm</th>
                      <th>Tiền phạt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.items.map((i, idx) => (
                      <tr key={idx}>
                        <td>{i.title}</td>
                        <td>
                          {i.late && "Trễ "}
                          {i.damage === "damaged" && "Hư "}
                          {i.damage === "lost" && "Mất "}
                          {!i.late && i.damage === "none" && "Không"}
                        </td>
                        <td>{i.fee.toLocaleString()}đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="receipt-footer">
                  <span>{r.paymentMethod}</span>
                  <span className="total">Tổng: {r.total.toLocaleString()}đ</span>
                </div>
              </div>
            ))
          ) : (
            <div className="small-text">Chưa có phiếu trả nào.</div>
          )}
        </div>

      </div>
    </div>
  );
}
