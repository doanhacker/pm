import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Category.css";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Tiểu thuyết", description: "Sách văn học, truyện dài" },
    { id: 2, name: "Khoa học", description: "Kiến thức khoa học" },
    { id: 3, name: "Lịch sử", description: "Các sự kiện lịch sử" },
    { id: 4, name: "Lập trình nâng cao", description: "Hướng tới các thuật toán lập trình nâng cao" },
    { id: 5, name: "Quản lý dự án phần mềm", description: "Chuyên hướng dẫn về các phương án dành cho quản lý phần mềm" },
    { id: 6, name: "Văn học", description: "Nghị luận các bài văn học" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentCategory, setCurrentCategory] = useState({
    id: "",
    name: "",
    description: "",
  });

  const handleAdd = () => {
    setModalType("add");
    setCurrentCategory({ id: "", name: "", description: "" });
    setModalOpen(true);
  };

  const handleEdit = (cat) => {
    setModalType("edit");
    setCurrentCategory(cat);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Xóa thể loại này?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentCategory.name.trim()) {
      alert("Vui lòng nhập tên thể loại!");
      return;
    }

    if (modalType === "add") {
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          name: currentCategory.name,
          description: currentCategory.description,
        },
      ]);
    } else {
      setCategories(
        categories.map((c) =>
          c.id === currentCategory.id ? currentCategory : c
        )
      );
    }

    setModalOpen(false);
  };

  return (
    <div className="category-page">

      {/* HEADER */}
      <div className="category-header">
        <h2>
          📚 Quản lý thể loại sách
        </h2>

        <button className="btn-add" onClick={handleAdd}>
          <FiPlus /> Thêm thể loại
        </button>
      </div>

      {/* CARD TABLE */}
      <div className="category-card">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th style={{ width: 60 }}>ID</th>
              <th>Tên thể loại</th>
              <th>Mô tả</th>
              <th style={{ width: 140 }} className="text-center">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
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
                      className="action-btn edit"
                      onClick={() => handleEdit(cat)}
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5>
                {modalType === "add"
                  ? "Thêm thể loại mới"
                  : "Chỉnh sửa thể loại"}
              </h5>
              <button onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className="custom-modal-body">
              <label>Tên thể loại</label>
              <input
                type="text"
                value={currentCategory.name}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    name: e.target.value,
                  })
                }
              />

              <label>Mô tả</label>
              <textarea
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

            <div className="custom-modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setModalOpen(false)}
              >
                Hủy
              </button>
              <button className="btn-save" onClick={handleSave}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Category;
