import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar /> 

      <div className="main">
        <Header />
        {children}
      </div>
    </div>
  );
}
