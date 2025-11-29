import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/Location.css";

const Location = () => {
  // Dữ liệu mẫu
  const [locations, setLocations] = useState([
    { id: 1, name: "Kệ A1", description: "Khu vực sách văn học", capacity: 120 },
    { id: 2, name: "Kệ B2", description: "Sách khoa học và nghiên cứu", capacity: 90 },
    { id: 3, name: "Kệ C3", description: "Sách thiếu nhi", capacity: 150 },
  ]);

  const [modalType, setModalType] = useState("add");
  const [currentLocation, setCurrentLocation] = useState({
    id: "",
    name: "",
    description: "",
    capacity: "",
  });

  // Mở modal thêm
  const handleAdd = () => {
    setModalType("add");
    setCurrentLocation({ id: "", name: "", description: "", capacity: "" });
  };

  // Mở modal sửa
  const handleEdit = (loc) => {
    setModalType("edit");
    setCurrentLocation(loc);
  };

  // Lưu dữ liệu
  const handleSave = () => {
    if (!currentLocation.name.trim()) {
      alert("Vui lòng nhập tên vị trí!");
      return;
    }

    if (modalType === "add") {
      const newLoc = {
        id: locations.length + 1,
        name: currentLocation.name,
        description: currentLocation.description,
        capacity: currentLocation.capacity,
      };
      setLocations([...locations, newLoc]);
    } else {
      const updated = locations.map((l) =>
        l.id === currentLocation.id ? currentLocation : l
      );
      setLocations(updated);
    }

    document.getElementById("closeLocationModalBtn").click();
  };

  // Xóa vị trí
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa vị trí này?")) {
      setLocations(locations.filter((l) => l.id !== id));
    }
  };

  return (
    <div className="content-area">

      {/* HEADER */}
      <div className="page-header-custom">
        <h2 className="fw-bold m-0">
          <i className="bi bi-geo-alt-fill me-2"></i>
          Quản lý vị trí lưu sách
        </h2>

        <button
          className="btn btn-primary btn-add shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#locationModal"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Thêm vị trí
        </button>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm border-0 mt-3 category-card">
        <div className="card-body">

          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: "60px" }}>ID</th>
                <th>Tên vị trí</th>
                <th>Mô tả</th>
                <th>Sức chứa</th>
                <th style={{ width: "160px" }} className="text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {locations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-secondary">
                    Chưa có dữ liệu
                  </td>
                </tr>
              ) : (
                locations.map((loc) => (
                  <tr key={loc.id}>
                    <td className="fw-bold">{loc.id}</td>
                    <td>{loc.name}</td>
                    <td>{loc.description}</td>
                    <td>{loc.capacity}</td>
                    <td className="text-center">

                      <button
                        className="btn btn-warning btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#locationModal"
                        onClick={() => handleEdit(loc)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(loc.id)}
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
      <div className="modal fade" id="locationModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content shadow">

            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {modalType === "add" ? "Thêm vị trí mới" : "Sửa thông tin vị trí"}
              </h5>

              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label fw-semibold">Tên vị trí</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentLocation.name}
                  onChange={(e) =>
                    setCurrentLocation({ ...currentLocation, name: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Mô tả</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={currentLocation.description}
                  onChange={(e) =>
                    setCurrentLocation({
                      ...currentLocation,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Sức chứa</label>
                <input
                  type="number"
                  className="form-control"
                  value={currentLocation.capacity}
                  onChange={(e) =>
                    setCurrentLocation({
                      ...currentLocation,
                      capacity: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <div className="modal-footer">
              <button
                id="closeLocationModalBtn"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>

              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Lưu thay đổi
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Location;
