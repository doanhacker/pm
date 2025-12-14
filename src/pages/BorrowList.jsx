// src/pages/BorrowList.jsx
import { useState } from "react";
import BorrowModal from "./BorrowModal";
import RenewModal from "./RenewModal";
import "../styles/borrow.css";

export default function BorrowList() {
    const sampleBooks = {
        1: { name: "Harry Potter", price: 15000 },
        2: { name: "Doraemon", price: 8000 },
        3: { name: "Lược Sử Thời Gian", price: 20000 },
        4: { name: "Sherlock Holmes", price: 12000 },
        5: { name: "Đắc Nhân Tâm", price: 10000 },
    };

    const [borrowSlips, setBorrowSlips] = useState([
        {
            id: 1,
            reader: { name: "Nguyễn Văn A", email: "a@gmail.com" },
            items: [
                { bookId: 1, quantity: 2, returnDate: "2024-12-05" },
                { bookId: 3, quantity: 1, returnDate: "2024-12-10" },
            ],
            status: "pending",
        },
        {
            id: 2,
            reader: { name: "Trần Thị B", email: "b@gmail.com" },
            items: [{ bookId: 4, quantity: 1, returnDate: "2024-11-30" }],
            status: "confirmed",
        },
        {
            id: 3,
            reader: { name: "Lê Thị C", email: "c@gmail.com" },
            items: [{ bookId: 2, quantity: 1, returnDate: "2024-12-20" }],
            status: "borrowing",
        },
        {
            id: 4,
            reader: { name: "Phạm Văn D", email: "d@gmail.com" },
            items: [
                { bookId: 5, quantity: 1, returnDate: "2024-12-01" },
                { bookId: 2, quantity: 2, returnDate: "2024-12-01" },
            ],
            status: "pending",
        },
        {
            id: 5,
            reader: { name: "Hoàng Thị E", email: "e@gmail.com" },
            items: [{ bookId: 3, quantity: 1, returnDate: "2024-11-25" }],
            status: "returned",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingSlip, setEditingSlip] = useState(null);
    const [renewBorrow, setRenewBorrow] = useState(null);

    // tính tổng theo B: price * quantity (không nhân ngày)
    const calcTotal = (items) =>
        items.reduce((s, it) => s + sampleBooks[it.bookId].price * it.quantity, 0);

    const openAdd = () => {
        setEditingSlip(null);
        setShowModal(true);
    };

    const openEdit = (slip) => {
        // prepare slip data in same shape modal expects
        const prepared = {
            id: slip.id,
            reader: slip.reader,
            items: slip.items.map((i) => ({ ...i })), // copy
            status: slip.status || "pending",
        };
        setEditingSlip(prepared);
        setShowModal(true);
    };

    const saveSlip = (data) => {
        if (data.id) {
            // edit
            setBorrowSlips((prev) =>
                prev.map((s) => (s.id === data.id ? { ...s, ...data } : s))
            );
        } else {
            // add
            const newSlip = {
                id: borrowSlips.length + 1,
                ...data,
            };
            setBorrowSlips((prev) => [...prev, newSlip]);
        }
        setShowModal(false);
        setEditingSlip(null);
    };

    const deleteSlip = (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa phiếu mượn này?")) return;
        setBorrowSlips((prev) => prev.filter((s) => s.id !== id));
    };

    return (
        <div className="borrow-container">
            <div className="top-row">
                <h2 className="page-title">Phiếu mượn</h2>
                <button className="btn-add" onClick={openAdd}>
                    + Tạo phiếu mượn
                </button>
            </div>

            <div className="card-box">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Độc giả</th>
                            <th>Sách</th>
                            <th>Trạng thái</th>
                            <th>Tổng tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {borrowSlips.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>
                                    <div className="reader-name">{s.reader.name}</div>
                                    <div className="reader-email">{s.reader.email}</div>
                                </td>

                                <td>
                                    {s.items.map((it, idx) => (
                                        <div key={idx} className="book-line">
                                            • {sampleBooks[it.bookId].name} x {it.quantity}{" "}
                                            <span className="book-return">(trả: {it.returnDate})</span>
                                        </div>
                                    ))}
                                </td>

                                <td>
                                    {s.status === "pending" && (
                                        <span className="badge grey">Chưa xác nhận</span>
                                    )}
                                    {s.status === "confirmed" && (
                                        <span className="badge aqua">Đã xác nhận</span>
                                    )}
                                    {s.status === "borrowing" && (
                                        <span className="badge yellow">Đang mượn</span>
                                    )}
                                    {s.status === "returned" && (
                                        <span className="badge green">Đã trả</span>
                                    )}
                                </td>

                                <td className="total-col">{calcTotal(s.items).toLocaleString()}đ</td>

                                <td className="action-col">
                                    <div className="action-row">
                                      <button className="btn-yellow" onClick={() => openEdit(s)}>
                                          Sửa
                                      </button>

                                      <button
                                          className="btn btn-outline-info btn-sm me-2"
                                          onClick={() => setRenewBorrow(s)}
                                      >
                                          Gia hạn
                                      </button>

                                      <button className="btn-red" onClick={() => deleteSlip(s.id)}>
                                          Xóa
                                      </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <BorrowModal
                    slip={editingSlip}
                    onClose={() => {
                        setShowModal(false);
                        setEditingSlip(null);
                    }}
                    onSave={(data) => saveSlip(data)}
                />
            )}

            <RenewModal
                borrow={renewBorrow}
                books={sampleBooks}
                onSave={(updatedBorrow) => {
                    setBorrowSlips((prev) =>
                        prev.map((b) =>
                            b.id === updatedBorrow.id ? updatedBorrow : b
                        )
                    );
                    setRenewBorrow(null);
                }}
                onClose={() => setRenewBorrow(null)}
            />

        </div>
    );
}
