import { useState, useEffect } from "react";
import "../styles/borrow.css";
import qrBank from "../assets/qr-bank.png";
export default function BorrowModal({ slip, onClose, onSave }) {
    const readers = [
        { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com" },
        { id: 2, name: "Trần Thị B", email: "b@gmail.com" },
        { id: 3, name: "Lê Văn C", email: "c@gmail.com" },
        { id: 4, name: "Đào Trọng Đoàn", email: "trung@gmail.com" },
        { id: 5, name: "Nguyễn Thành Trung", email: "doan@gmail.com" },
    ];

    const books = [
        { id: 1, title: "Harry Potter", price: 15000 },
        { id: 2, title: "Doraemon", price: 8000 },
        { id: 3, title: "Lược Sử Thời Gian", price: 20000 },
        { id: 4, title: "Sherlock Holmes", price: 12000 },
        { id: 5, title: "Đắc Nhân Tâm", price: 10000 },
    ];

    const today = new Date().toISOString().split("T")[0];

    const [selectedReader, setSelectedReader] = useState("");
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("pending");
    const [searchBook, setSearchBook] = useState("");

    // THANH TOÁN
    const [payment, setPayment] = useState("");
    const [onlineType, setOnlineType] = useState("");

    useEffect(() => {
        if (slip) {
            setSelectedReader(slip.reader?.name || "");
            setItems(slip.items.map(i => ({ ...i })));
            setStatus(slip.status || "pending");
        } else {
            setSelectedReader("");
            setItems([]);
            setStatus("pending");
        }
    }, [slip]);

    const isSelected = (id) => items.some(i => i.bookId === id);

    const toggleBook = (book) => {
        if (isSelected(book.id)) {
            setItems(items.filter(i => i.bookId !== book.id));
        } else {
            setItems([
                ...items,
                {
                    bookId: book.id,
                    quantity: 1,
                    returnDate: today,
                    title: book.title,
                    price: book.price
                }
            ]);
        }
    };

    const updateQuantity = (id, q) =>
        setItems(items.map(i => i.bookId === id ? { ...i, quantity: Number(q) } : i));

    const updateReturnDate = (id, d) =>
        setItems(items.map(i => i.bookId === id ? { ...i, returnDate: d } : i));

    // TÍNH TỔNG (không nhân ngày)
    const total = items.reduce(
        (s, i) => s + i.quantity * i.price,
        0
    );

    const handleSave = () => {
        if (!selectedReader) return alert("Vui lòng chọn độc giả!");
        if (items.length === 0) return alert("Vui lòng chọn ít nhất 1 sách!");
        if (!payment) return alert("Vui lòng chọn hình thức thanh toán!");

        if (payment === "online" && !onlineType)
            return alert("Vui lòng chọn loại thanh toán online!");

        onSave({
            id: slip?.id,
            reader: readers.find(r => r.name === selectedReader),
            items,
            status,
            payment,
            onlineType
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box large">

                {/* HEADER */}
                <div className="modal-header blue">
                    <h3>{slip ? "Chỉnh sửa phiếu mượn" : "Tạo phiếu mượn"}</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* BODY */}
                <div className="modal-body">

                    {/* ĐỘC GIẢ */}
                    <label className="label">Độc giả</label>
                    <select
                        className="input"
                        value={selectedReader}
                        onChange={(e) => setSelectedReader(e.target.value)}
                    >
                        <option value="">-- Chọn độc giả --</option>
                        {readers.map(r => (
                            <option key={r.id} value={r.name}>
                                {r.name} ({r.email})
                            </option>
                        ))}
                    </select>
                    <label className="label mt">Tìm sách</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Nhập tên sách..."
                        value={searchBook}
                        onChange={(e) => setSearchBook(e.target.value)}
                    />

                    {/* TÌM SÁCH */}
                    <label className="label mt">Danh sách sách</label>

                    <div className="book-list">
                        {books.map(b => {
                            const sel = items.find(i => i.bookId === b.id);
                            return (
                                <div className="book-row" key={b.id}>
                                    <div>
                                        <div className="book-title">{b.title}</div>
                                        <div className="book-price">{b.price.toLocaleString()}đ / ngày</div>

                                        {sel && (
                                            <div style={{ marginTop: 10 }}>
                                                SL:
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="small-input"
                                                    value={sel.quantity}
                                                    onChange={(e) => updateQuantity(b.id, e.target.value)}
                                                />

                                                Ngày trả:
                                                <input
                                                    type="date"
                                                    className="small-input"
                                                    value={sel.returnDate}
                                                    min={today}
                                                    onChange={(e) => updateReturnDate(b.id, e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className={sel ? "btn-danger-sm" : "btn-primary-sm"}
                                        onClick={() => toggleBook(b)}
                                    >
                                        {sel ? "Bỏ chọn" : "Chọn"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* TỔNG TIỀN */}
                    <div className="total-box">
                        <strong>Tổng tiền: </strong>
                        <span className="total-amount">
                            {total.toLocaleString()}đ
                        </span>
                    </div>

                    {/* TRẠNG THÁI */}
                    <label className="label mt">Trạng thái phiếu</label>
                    <select
                        className="input"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pending">Chưa xác nhận</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="borrowing">Đang mượn</option>
                    </select>

                    {/* THANH TOÁN */}
                    <h4 className="mt-3">Thanh toán</h4>

                    <select
                        className="input"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                    >
                        <option value="">-- Chọn hình thức --</option>
                        <option value="cash">💵 Tiền mặt</option>
                        <option value="online">🌐 Online</option>
                    </select>

                    {/* ONLINE */}
                    {payment === "online" && (
                        <div className="mt-2">
                            <select
                                className="input"
                                value={onlineType}
                                onChange={(e) => setOnlineType(e.target.value)}
                            >
                                <option value="">-- Chọn loại online --</option>
                                <option value="bank">🏦 Ngân hàng</option>
                                <option value="visa">💳 Visa/Mastercard</option>
                                <option value="momo">🟪 Momo</option>
                            </select>

                            {onlineType === "bank" && (
                                <div className="qr-box">
                                    <img src={qrBank} alt="QR ngân hàng" className="qr-img" />
                                </div>
                            )}

                            {onlineType === "visa" && (
                                <div className="visa-box">
                                    <input className="input" placeholder="Số thẻ" />
                                    <input className="input" placeholder="MM/YY" />
                                    <input className="input" placeholder="CVV" />
                                </div>
                            )}

                            {onlineType === "momo" && (
                                <div className="qr-box">QR Momo sẽ hiển thị tại đây</div>
                            )}
                        </div>
                    )}

                </div>

                {/* FOOTER */}
                <div className="modal-footer">
                    <button className="btn grey" onClick={onClose}>Hủy</button>
                    <button className="btn primary" onClick={handleSave}>Lưu phiếu</button>
                    <button className="btn primary" onClick={handleSave}>In hóa đơn</button>
                    
                </div>

            </div>
        </div>
    );
}
