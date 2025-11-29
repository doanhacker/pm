import { useState, useEffect } from "react";
import "../styles/statistics.css";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement
);

export default function Statistics() {

    // ===== SAMPLE DATA =====
    const [readers] = useState(150);
    const [books] = useState(3200);
    const [borrows] = useState(245);
    const [borrowingBooks] = useState(87);

    // Biểu đồ mượn theo tháng
    const borrowData = {
        labels: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7"],
        datasets: [
            {
                label: "Lượt mượn",
                data: [30, 45, 60, 75, 90, 50, 80],
                backgroundColor: "#0d6efd",
            },
        ],
    };

    // Biểu đồ top sách
    const topBooksData = {
        labels: ["Harry Potter", "Doraemon", "Lược Sử Thời Gian", "Sherlock", "Đắc Nhân Tâm"],
        datasets: [
            {
                label: "Lượt mượn",
                data: [120, 95, 80, 65, 55],
                backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
            },
        ],
    };

    return (
        <div className="stats-container">

            {/* ====== THÔNG TIN TỔNG QUAN ====== */}
            <h2 className="page-title">
                <i className="bi bi-bar-chart-fill me-2"></i> Thống kê tổng quan
            </h2>

            <div className="stats-cards">
                <div className="stats-card">
                    <h4>{readers}</h4>
                    <p>Độc giả</p>
                </div>
                <div className="stats-card">
                    <h4>{books}</h4>
                    <p>Tổng số sách</p>
                </div>
                <div className="stats-card">
                    <h4>{borrows}</h4>
                    <p>Lượt mượn tháng này</p>
                </div>
                <div className="stats-card">
                    <h4>{borrowingBooks}</h4>
                    <p>Sách đang được mượn</p>
                </div>
            </div>

            {/* ===== BIỂU ĐỒ ===== */}
            <div className="chart-row">
                <div className="chart-box">
                    <h5>Lượt mượn theo tháng</h5>
                    <Bar data={borrowData} />
                </div>

                <div className="chart-box">
                    <h5>Top sách mượn nhiều nhất</h5>
                    <Pie data={topBooksData} />
                </div>
            </div>
        </div>
    );
}
