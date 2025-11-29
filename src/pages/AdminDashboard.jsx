import "../styles/dashboard.css";

export default function AdminDashboard() {
    return (
        <div>

            <h2 style={{ marginTop: "20px" }}>Dashboard</h2>

            {/* BIG STATS */}
            <div className="big-stats">
                <div className="big-box">
                    <div className="big-box-title">Lượt mượn tháng này</div>
                    <div className="big-box-number">245</div>
                </div>

                <div className="big-box">
                    <div className="big-box-title">Tổng sách trong kho</div>
                    <div className="big-box-number">3200</div>
                </div>

                <div className="big-box">
                    <div className="big-box-title">Khách hàng đang hoạt động</div>
                    <div className="big-box-number">150</div>
                </div>
            </div>

            {/* SMALL STATS */}
            <div className="small-stats">
                <div className="small-box">
                    <h3>Phiếu mượn hôm nay</h3>
                    <p>12</p>
                </div>

                <div className="small-box">
                    <h3>Khách hàng mới</h3>
                    <p>3</p>
                </div>

                <div className="small-box">
                    <h3>Sách đang cho mượn</h3>
                    <p>87</p>
                </div>
            </div>

            {/* RECENT ACTIVITIES */}
            <div className="table-section">
                <div className="table-title">Hoạt động gần đây</div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Thời gian</th>
                                <th>Hoạt động</th>
                                <th>Nhân viên</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10:24  |  15/11</td>
                                <td>Tạo phiếu mượn #PM0123</td>
                                <td>Nguyễn Thu Hà</td>
                            </tr>
                            <tr>
                                <td>09:10  |  15/11</td>
                                <td>Trả sách #PM0110</td>
                                <td>Trần Minh Hùng</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="view-more">Xem thêm...</div>
                </div>
            </div>

            {/* TOP BOOKS */}
            <div className="table-section">
                <div className="table-title">Top sách được mượn nhiều</div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Mã sách</th>
                                <th>Tên sách</th>
                                <th>Số lượt mượn</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>S001</td>
                                <td>Doraemon Tập 12</td>
                                <td>58</td>
                            </tr>
                            <tr>
                                <td>S034</td>
                                <td>Harry Potter 1</td>
                                <td>42</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="view-more">Xem thêm...</div>
                </div>
            </div>


            {/* NOTIFICATION */}
            <div className="table-section">
                <div className="table-title">Thông báo</div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Nội dung</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>15/11</td>
                                <td>Sách “Harry Potter 2” đang bị quá hạn 3 ngày – Bạn đọc BD005</td>
                            </tr>

                            <tr>
                                <td>14/11</td>
                                <td>3 quyển sách bị hư hỏng, cần kiểm tra lại</td>
                            </tr>
                        </tbody>

                    </table>
                    <div className="view-more">Xem thêm...</div>
                </div>
            </div>

        </div>
    );
}
