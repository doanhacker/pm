import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import ReturnBook from "./pages/ReturnBook";
import AdminLayout from "./layouts/AdminLayout";
import BorrowList from "./pages/BorrowList";
import BookList from "./pages/BookList";
import AuthorList from "./pages/AuthorList";
import PublisherList from "./pages/PublisherList";
import ReaderList from "./pages/ReaderList";
import Category from "./pages/Category";
import Location from "./pages/Location";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <Routes>

      {/* --- PUBLIC ROUTES (không có sidebar) --- */}
      <Route path="/auth" element={<Auth />} />

      {/* Khi vào trang chủ "/", tự động chuyển sang /admin/dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />

      {/* --- ADMIN ROUTES (có sidebar + header) --- */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/return"
        element={
          <AdminLayout>
            <ReturnBook />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/borrow"
        element={
          <AdminLayout>
            <BorrowList />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/books"
        element={
          <AdminLayout>
            <BookList />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/authors"
        element={
          <AdminLayout>
            <AuthorList />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/publishers"
        element={
          <AdminLayout>
            <PublisherList />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/readers"
        element={
          <AdminLayout>
            <ReaderList />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/types"
        element={
          <AdminLayout>
            <Category />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/positions"
        element={
          <AdminLayout>
            <Location />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/static"
        element={
          <AdminLayout>
            <Statistics />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default App;
