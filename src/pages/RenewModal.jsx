import { useState, useEffect } from "react";
import "../styles/renew.css";   // nhớ import CSS mới

export default function RenewModal({ borrow, books, onSave }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (borrow) setItems(borrow.items);
    }, [borrow]);

    if (!borrow) return null;

    const updateReturnDate = (bookId, newDate) => {
        setItems(prev =>
            prev.map(i => (i.bookId === bookId ? { ...i, returnDate: newDate } : i))
        );
    };

    const calculateTotal = () => {
        return items.reduce((sum, it) => {
            const book = books[it.bookId];
            if (!book) return sum;

            const now = new Date();
            const rDate = new Date(it.returnDate);

            const days = Math.max(
                1,
                Math.ceil((rDate - now) / (1000 * 60 * 60 * 24))
            );

            return sum + book.price * it.quantity * days;
        }, 0);
    };

    const saveRenew = () => {
        onSave({ ...borrow, items });
        document.getElementById("closeRenewModal")?.click();
    };

    return (
        <div className="modal fade" id="renewModal" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content renew-container">

                    {/* HEADER */}
                    <div className="renew-header">
                        <h4>Gia hạn mượn sách</h4>
                        <button className="renew-close" data-bs-dismiss="modal">✕</button>
                    </div>

                    {/* BODY */}
                    <div className="modal-body renew-body">

                        {items.map(it => {
                            const book = books[it.bookId];

                            return (
                                <div key={it.bookId} className="renew-item">
                                    <div className="renew-title">{book.name}</div>
                                    <div className="renew-price">{book.price.toLocaleString()}đ / ngày</div>

                                    <div className="renew-field">
                                        <label>Ngày trả mới:</label>
                                        <input
                                            type="date"
                                            className="renew-date"
                                            value={it.returnDate}
                                            min={new Date().toISOString().split("T")[0]}
                                            onChange={(e) =>
                                                updateReturnDate(it.bookId, e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        <div className="renew-total-box">
                            <span>Tổng tiền mới:</span>
                            <strong className="renew-total">
                                {calculateTotal().toLocaleString()}đ
                            </strong>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="renew-footer">

                        {/* ❌ Hủy gia hạn — không lưu, trả về trạng thái ban đầu */}
                        <button
                            id="closeRenewModal"
                            className="btn-cancel"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                setItems(borrow.items); // 👉 trả lại items cũ, không lưu thay đổi
                            }}
                        >
                            Hủy gia hạn
                        </button>

                        {/* ✔ Xác nhận gia hạn — có lưu thay đổi */}
                        <button className="btn-confirm" onClick={saveRenew}>
                            Xác nhận gia hạn
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
