import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/Category.css"; // file CSS mở rộng

const Category = () => {
  // Dữ liệu mẫu
  const [categories, setCategories] = useState([
    { id: 1, name: "Tiểu thuyết", description: "Sách văn học, truyện dài" },
    { id: 2, name: "Khoa học", description: "Kiến thức khoa học" },
    { id: 3, name: "Lịch sử", description: "Các sự kiện lịch sử" },
  ]);

  const [modalType, setModalType] = useState("add");
  const [currentCategory, setCurrentCategory] = useState({
    id: "",
    name: "",
    description: "",
  });

  // Mở modal thêm
  const handleAdd = () => {
    setModalType("add");
    setCurrentCategory({ id: "", name: "", description: "" });
  };

  // Mở modal sửa
  const handleEdit = (cat) => {
    setModalType("edit");
    setCurrentCategory(cat);
  };

  // Lưu dữ liệu
  const handleSave = () => {
    if (!currentCategory.name.trim()) {
      alert("Vui lòng nhập tên thể loại!");
      return;
    }

    if (modalType === "add") {
      const newCategory = {
        id: categories.length + 1,
        name: currentCategory.name,
        description: currentCategory.description,
      };
      setCategories([...categories, newCategory]);
    } else {
      const updated = categories.map((cat) =>
        cat.id === currentCategory.id ? currentCategory : cat
      );
      setCategories(updated);
    }

    document.getElementById("closeModalBtn").click();
  };

  // Xóa
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thể loại này?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="content-area">

      {/* HEADER */}
      <div className="page-header-custom">
        <h2 className="fw-bold m-0">
          <i className="bi bi-tags-fill me-2"></i>
          Quản lý thể loại sách
        </h2>

        <button
          className="btn btn-primary btn-add shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#categoryModal"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Thêm thể loại
        </button>
      </div>

      {/* CARD TABLE */}
      <div className="card shadow-sm border-0 mt-3 category-card">
        <div className="card-body">

          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: "60px" }}>ID</th>
                <th>Tên thể loại</th>
                <th>Mô tả</th>
                <th style={{ width: "160px" }} className="text-center">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-secondary">
                    Chưa có dữ liệu
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id}>
                    <td className="fw-bold">{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.description}</td>
                    <td className="text-center">

                      <button
                        className="btn btn-warning btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#categoryModal"
                        onClick={() => handleEdit(cat)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(cat.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>

      {/* ================= MODAL ================= */}
      <div className="modal fade" id="categoryModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content shadow">

            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {modalType === "add" ? "Thêm thể loại mới" : "Sửa thể loại"}
              </h5>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label fw-semibold">Tên thể loại</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentCategory.name}
                  onChange={(e) =>
                    setCurrentCategory({ ...currentCategory, name: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Mô tả</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={currentCategory.description}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

            </div>

            <div className="modal-footer">
              <button
                id="closeModalBtn"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Lưu thay đổi
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Category;
