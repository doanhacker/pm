import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Location.css";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const Location = () => {
  const [locations, setLocations] = useState([
    { id: 1, name: "Kệ A1", description: "Khu vực sách văn học", capacity: 120 },
    { id: 2, name: "Kệ B2", description: "Sách khoa học và nghiên cứu", capacity: 90 },
    { id: 3, name: "Kệ C3", description: "Sách thiếu nhi", capacity: 150 },
    { id: 4, name: "Kệ D4", description: "Sách toán học", capacity: 150 },
    { id: 5, name: "Kệ D4", description: "Sách học thuật", capacity: 150 },
    { id: 6, name: "Kệ E8", description: "Sách lịch sử chiến tranh", capacity: 150 }, 
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentLocation, setCurrentLocation] = useState({
    id: "",
    name: "",
    description: "",
    capacity: "",
  });

  const handleAdd = () => {
    setModalType("add");
    setCurrentLocation({ id: "", name: "", description: "", capacity: "" });
    setModalOpen(true);
  };

  const handleEdit = (loc) => {
    setModalType("edit");
    setCurrentLocation(loc);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Xóa vị trí này?")) {
      setLocations(locations.filter((l) => l.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentLocation.name.trim()) {
      alert("Vui lòng nhập tên vị trí!");
      return;
    }

    if (modalType === "add") {
      setLocations([
        ...locations,
        {
          id: locations.length + 1,
          name: currentLocation.name,
          description: currentLocation.description,
          capacity: currentLocation.capacity,
        },
      ]);
    } else {
      setLocations(
        locations.map((l) =>
          l.id === currentLocation.id ? currentLocation : l
        )
      );
    }

    setModalOpen(false);
  };

  return (
    <div className="location-page">

      {/* HEADER */}
      <div className="location-header">
        <h2>📍 Quản lý vị trí lưu sách</h2>

        <button className="btn-add" onClick={handleAdd}>
          <FiPlus /> Thêm vị trí
        </button>
      </div>

      {/* CARD TABLE */}
      <div className="location-card">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th style={{ width: 60 }}>ID</th>
              <th>Tên vị trí</th>
              <th>Mô tả</th>
              <th>Sức chứa</th>
              <th style={{ width: 140 }} className="text-center">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {locations.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
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
                      className="action-btn edit"
                      onClick={() => handleEdit(loc)}
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(loc.id)}
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
                  ? "Thêm vị trí mới"
                  : "Chỉnh sửa vị trí"}
              </h5>
              <button onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className="custom-modal-body">
              <label>Tên vị trí</label>
              <input
                type="text"
                value={currentLocation.name}
                onChange={(e) =>
                  setCurrentLocation({
                    ...currentLocation,
                    name: e.target.value,
                  })
                }
              />

              <label>Mô tả</label>
              <textarea
                rows="3"
                value={currentLocation.description}
                onChange={(e) =>
                  setCurrentLocation({
                    ...currentLocation,
                    description: e.target.value,
                  })
                }
              ></textarea>

              <label>Sức chứa</label>
              <input
                type="number"
                value={currentLocation.capacity}
                onChange={(e) =>
                  setCurrentLocation({
                    ...currentLocation,
                    capacity: e.target.value,
                  })
                }
              />
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

export default Location;
