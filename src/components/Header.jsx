import "../styles/dashboard.css";

export default function Header() {
  return (
    <div className="header">
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm nhanh..." />
      </div>

      <div className="header-user">
        <span>Xin chào, Thủ thư</span>
        <img src="https://i.pravatar.cc/50" alt="avatar" />
      </div>
    </div>
  );
}
