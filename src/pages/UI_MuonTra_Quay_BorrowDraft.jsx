import React, { useState, useEffect } from 'react';

// Mượn_Đặt_Sách_Tại_Quầy.jsx
// Single-file React component (default export) using TailwindCSS styles.
// Gợi ý: đặt file này trong project create-react-app / Vite + Tailwind.
// Image tham khảo giao diện: /mnt/data/a4a6fa2e-219b-46c7-b547-460f01fbc9cb.png

// ===================== MODULE: ĐẶT SÁCH TẠI QUẦY (PHIẾU ĐẶT TRƯỚC) =====================
// Component mới cho giao diện đặt sách riêng biệt
export function DatSachTaiQuay() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Đặt sách tại quầy</h2>

        <div className="mb-4">
          <label className="text-sm text-slate-600">Nhập mã độc giả hoặc tên</label>
          <input className="w-full border p-2 rounded mt-1" placeholder="Nhập mã hoặc quét mã độc giả…" />
        </div>

        <div className="mb-4">
          <label className="text-sm text-slate-600">Nhập tên sách / mã sách</label>
          <input className="w-full border p-2 rounded mt-1" placeholder="Tìm sách muốn đặt trước…" />
        </div>

        <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">Tìm kiếm</button>

        <div className="mt-6 text-sm text-slate-500">(Danh sách kết quả hiển thị tại đây…)</div>
      </div>
    </div>
  );
}

// ===================== MODULE: MƯỢN & ĐẶT SÁCH =====================
export default function BorrowAtCounter() {
  // UI states
  const [queryReader, setQueryReader] = useState('');
  const [reader, setReader] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSearchBookModal, setShowSearchBookModal] = useState(false);
  const [draftSlip, setDraftSlip] = useState(null);
  const [bookQuery, setBookQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [toast, setToast] = useState(null);
  const [placingHoldFor, setPlacingHoldFor] = useState(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Mocked API helpers: in real app, replace fetchMock with real fetch calls
  async function fetchMock(url, opts) {
    // small router for demo
    if (url.startsWith('/api/docgia?')) {
      const q = new URLSearchParams(url.split('?')[1]).get('query');
      // return empty to simulate not found when query contains 'new'
      if (!q || q.trim() === '' || q.includes('new')) return [];
      return [
        { MaDocGia: 101, HoTen: 'Nguyễn Văn A', SDT: '0912345678', DiaChi: 'Hà Nội', HangDocGia: 'CoBan', TinhTrangViPham: '', SoSachDangMuon: 1 }
      ];
    }

    if (url === '/api/docgia' && opts?.method === 'POST') {
      // return created id
      return { MaDocGia: Math.floor(Math.random() * 9000) + 1000 };
    }

    if (url.startsWith('/api/sach?')) {
      const q = new URLSearchParams(url.split('?')[1]).get('query') || '';
      const fake = [
        { MaSach: 1, TenSach: 'Lập trình Python', TacGia: 'A. Tác giả', SoLuong: 3, DonGiaMuon: 12000, HangYeuCau: 'CoBan' },
        { MaSach: 2, TenSach: 'Cấu trúc dữ liệu', TacGia: 'B. Tác giả', SoLuong: 0, DonGiaMuon: 15000, HangYeuCau: 'CoBan' },
        { MaSach: 3, TenSach: 'Thuật toán nâng cao', TacGia: 'C. Tác giả', SoLuong: 1, DonGiaMuon: 20000, HangYeuCau: 'VIP' }
      ];
      return fake.filter(s => (s.TenSach + s.TacGia).toLowerCase().includes(q.toLowerCase()));
    }

    if (url === '/api/phieumuon' && opts?.method === 'POST') {
      return { MaPhieu: Math.floor(Math.random() * 90000) + 1000, NgayMuon: new Date().toISOString().slice(0,10) };
    }

    if (url.endsWith('/add-item') && opts?.method === 'POST') {
      return { success: true };
    }

    if (url.endsWith('/confirm') && opts?.method === 'POST') {
      return { success: true };
    }

    if (url.startsWith('/api/dattruoc') && opts?.method === 'POST') {
      return { MaDatTruoc: Math.floor(Math.random() * 90000) + 100 };
    }

    return null;
  }

  // Reader search behavior
  async function findReader() {
    setReader(null);
    if (!queryReader.trim()) return setToast({ type: 'error', text: 'Nhập mã/tên độc giả để tìm' });
    const results = await fetchMock(`/api/docgia?query=${encodeURIComponent(queryReader)}`);
    if (!results || results.length === 0) {
      setToast({ type: 'warn', text: 'Không tồn tại mã độc giả' });
      return;
    }
    setReader(results[0]);
  }

  // Register new reader
  async function registerReader(form) {
    const res = await fetchMock('/api/docgia', { method: 'POST', body: JSON.stringify(form) });
    setToast({ type: 'success', text: 'Tạo độc giả thành công: ' + (res?.MaDocGia || '') });
    setShowRegisterModal(false);
    // auto fill newly created id
    setQueryReader(String(res.MaDocGia));
    // emulate re-search
    setTimeout(findReader, 300);
  }

  // Start borrow workflow
  async function startBorrow() {
    if (!reader) return setToast({ type: 'error', text: 'Chọn độc giả trước' });
    if (reader.TinhTrangViPham) return setToast({ type: 'error', text: 'Độc giả đang vi phạm, không được mượn' });
    // create draft
    const res = await fetchMock('/api/phieumuon', { method: 'POST', body: JSON.stringify({ MaDocGia: reader.MaDocGia }) });
    const slip = { MaPhieu: res.MaPhieu, MaDocGia: reader.MaDocGia, NgayMuon: res.NgayMuon, TrangThai: 'Nhap', Items: [], TongTien: 0 };
    setDraftSlip(slip);
  }

  // Open search books modal
  function openSearchBooks() {
    setBookQuery('');
    setSearchResults([]);
    setShowSearchBookModal(true);
  }

  async function searchBooks() {
    const res = await fetchMock(`/api/sach?query=${encodeURIComponent(bookQuery)}`);
    setSearchResults(res || []);
  }

  async function addBookToSlip(book) {
    if (!draftSlip) return setToast({ type: 'error', text: 'Tạo phiếu trước khi thêm sách' });
    if (book.SoLuong === 0) {
      // show hold modal
      setPlacingHoldFor(book);
      return;
    }
    // check hang yeu cau
    if (book.HangYeuCau !== 'CoBan' && book.HangYeuCau !== reader.HangDocGia) {
      setToast({ type: 'error', text: 'Độc giả không đủ hạng mượn sách này' });
      return;
    }
    // append
    const exists = draftSlip.Items.find(i => i.MaSach === book.MaSach);
    let newItems;
    if (exists) {
      newItems = draftSlip.Items.map(i => i.MaSach === book.MaSach ? { ...i, SoLuong: i.SoLuong + 1 } : i);
    } else {
      newItems = [...draftSlip.Items, { MaSach: book.MaSach, TenSach: book.TenSach, SoLuong: 1, DonGia: book.DonGiaMuon, NgayTraDuKien: '' }];
    }
    const TongTien = newItems.reduce((s, it) => s + (it.SoLuong * it.DonGia), 0);
    setDraftSlip({ ...draftSlip, Items: newItems, TongTien });
    setShowSearchBookModal(false);
  }

  function updateItemQty(maSach, qty) {
    const newItems = draftSlip.Items.map(i => i.MaSach === maSach ? { ...i, SoLuong: Number(qty) } : i);
    const TongTien = newItems.reduce((s, it) => s + (it.SoLuong * it.DonGia), 0);
    setDraftSlip({ ...draftSlip, Items: newItems, TongTien });
  }

  async function confirmSlip(paymentMethod = 'TienMat') {
    // local validation
    if (!draftSlip || draftSlip.Items.length === 0) return setToast({ type: 'error', text: 'Phiếu rỗng, thêm sách trước' });
    // call confirm endpoint (mock)
    await fetchMock(`/api/phieumuon/${draftSlip.MaPhieu}/confirm`, { method: 'POST', body: JSON.stringify({ paymentMethod }) });
    setToast({ type: 'success', text: 'Mượn sách thành công' });
    // reset
    setDraftSlip(null);
    setReader(null);
    setQueryReader('');
  }

  async function placeHold(note = '') {
    if (!placingHoldFor || !reader) return setToast({ type: 'error', text: 'Cần độc giả và sách để đặt trước' });
    await fetchMock('/api/dattruoc', { method: 'POST', body: JSON.stringify({ MaDocGia: reader.MaDocGia, MaSach: placingHoldFor.MaSach, GhiChu: note }) });
    setToast({ type: 'success', text: 'Đặt trước thành công — sẽ thông báo khi sách có lại' });
    setPlacingHoldFor(null);
    setShowSearchBookModal(false);
  }

  // small UI components
  function Toast() {
    if (!toast) return null;
    const bg = toast.type === 'success' ? 'bg-green-100 border-green-300' : toast.type === 'error' ? 'bg-red-100 border-red-300' : 'bg-yellow-100 border-yellow-300';
    return (
      <div className={`fixed right-6 bottom-6 border ${bg} text-sm p-3 rounded shadow`}>{toast.text}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-slate-700">Mượn sách tại quầy</h1>
          <img src={'/mnt/data/a4a6fa2e-219b-46c7-b547-460f01fbc9cb.png'} alt="ui-ux" className="w-36 opacity-60 hidden md:block rounded" />
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 bg-white p-4 rounded shadow-sm">
            <label className="text-sm text-slate-500">Tìm độc giả (mã / tên / SDT / CCCD)</label>
            <div className="flex gap-2 mt-2">
              <input value={queryReader} onChange={e => setQueryReader(e.target.value)} className="flex-1 border rounded p-2" placeholder="Nhập mã hoặc quét mã..." />
              <button onClick={findReader} className="bg-indigo-600 text-white px-4 rounded">Tìm</button>
              <button onClick={() => setShowRegisterModal(true)} className="border px-4 rounded">Đăng ký mới</button>
            </div>

            <div className="mt-4">
              {reader ? (
                <div className="p-3 border rounded bg-slate-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-bold">{reader.HoTen}</div>
                      <div className="text-sm text-slate-600">{reader.DiaChi} · {reader.SDT}</div>
                      <div className="text-sm text-slate-500 mt-2">Hạng: {reader.HangDocGia} · Sách đang mượn: {reader.SoSachDangMuon}</div>
                    </div>
                    <div>
                      {reader.TinhTrangViPham ? <span className="text-red-500">Đang vi phạm</span> : <button onClick={startBorrow} className="bg-emerald-600 text-white px-3 py-2 rounded">Tiếp tục mượn</button>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 text-sm text-slate-500">Chưa có độc giả được chọn</div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-slate-700 mb-2">Hoạt động gần đây (demo)</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>10:24 | 15/11 — Tạo phiếu mượn #PM0123</li>
                <li>09:10 | 15/11 — Trả sách #PM0110</li>
              </ul>
            </div>
          </div>

          <aside className="bg-white p-4 rounded shadow-sm">
            <div className="text-sm text-slate-500">Phiếu mượn (nháp)</div>
            {!draftSlip ? (
              <div className="mt-4 text-sm text-slate-500">Chưa có phiếu. Tạo bằng nút Tiếp tục mượn ở khung độc giả.</div>
            ) : (
              <div className="mt-3">
                <div className="font-semibold">Mã phiếu: PM{draftSlip.MaPhieu}</div>
                <div className="text-sm text-slate-500">Ngày mượn: {draftSlip.NgayMuon}</div>
                <div className="mt-3 space-y-2">
                  {draftSlip.Items.map(item => (
                    <div key={item.MaSach} className="flex items-center justify-between text-sm border p-2 rounded">
                      <div>
                        <div className="font-medium">{item.TenSach}</div>
                        <div className="text-slate-500 text-xs">Đơn giá: {item.DonGia.toLocaleString()} đ</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="number" min={1} value={item.SoLuong} onChange={e => updateItemQty(item.MaSach, e.target.value)} className="w-20 border rounded p-1 text-sm" />
                        <div className="text-sm">{(item.SoLuong * item.DonGia).toLocaleString()} đ</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm text-slate-600">Tổng tiền: <strong>{draftSlip.TongTien.toLocaleString()} đ</strong></div>
                  <div className="flex gap-2">
                    <button onClick={openSearchBooks} className="border px-3 py-1 rounded">Thêm sách</button>
                    <button onClick={() => confirmSlip('TienMat')} className="bg-indigo-600 text-white px-3 py-1 rounded">Xác nhận & Thanh toán</button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </section>

        {/* Modals */}
        {showRegisterModal && (
          <Modal title="Đăng ký độc giả mới" onClose={() => setShowRegisterModal(false)}>
            <RegisterForm onCancel={() => setShowRegisterModal(false)} onSave={registerReader} />
          </Modal>
        )}

        {showSearchBookModal && (
          <Modal title="Tìm sách" onClose={() => setShowSearchBookModal(false)}>
            <div>
              <div className="flex gap-2">
                <input className="flex-1 border rounded p-2" value={bookQuery} onChange={e => setBookQuery(e.target.value)} placeholder="Nhập tên sách / tác giả / mã" />
                <button onClick={searchBooks} className="bg-indigo-600 text-white px-4 rounded">Tìm</button>
              </div>

              <div className="mt-4 space-y-3">
                {searchResults.length === 0 ? <div className="text-sm text-slate-500">Chưa có kết quả</div> : (
                  searchResults.map(b => (
                    <div key={b.MaSach} className={`p-3 border rounded flex items-center justify-between ${b.SoLuong===0? 'opacity-60':''}`}>
                      <div>
                        <div className="font-medium">{b.TenSach}</div>
                        <div className="text-xs text-slate-500">{b.TacGia} · Còn: {b.SoLuong} · Yêu cầu: {b.HangYeuCau}</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        {b.SoLuong === 0 ? (
                          <button onClick={() => setPlacingHoldFor(b)} className="border px-3 py-1 rounded">Đặt trước</button>
                        ) : (
                          <button onClick={() => addBookToSlip(b)} className="bg-emerald-600 text-white px-3 py-1 rounded">Thêm</button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Modal>
        )}

        {/* Place hold modal */}
        {placingHoldFor && (
          <Modal title={`Đặt trước: ${placingHoldFor.TenSach}`} onClose={() => setPlacingHoldFor(null)}>
            <div className="space-y-3">
              <div className="text-sm">Độc giả: {reader ? reader.HoTen : '---'}</div>
              <div className="text-sm">Mã sách: {placingHoldFor.MaSach}</div>
              <textarea placeholder="Ghi chú (nếu cần)" className="w-full border rounded p-2" id="hold-note" />
              <div className="flex justify-end gap-2">
                <button onClick={() => setPlacingHoldFor(null)} className="border px-3 py-1 rounded">Hủy</button>
                <button onClick={() => placeHold(document.getElementById('hold-note').value)} className="bg-indigo-600 text-white px-3 py-1 rounded">Xác nhận đặt trước</button>
              </div>
            </div>
          </Modal>
        )}

        <Toast />
      </div>
    </div>
  );
}


// Reusable modal component
function Modal({ children, title, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-slate-500">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

// Register form component
function RegisterForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ HoTen: '', NgaySinh: '', DiaChi: '', Email: '', SDT: '', CCCD: '', HangDocGia: 'CoBan' });
  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input required placeholder="Họ và tên" className="border p-2 rounded" value={form.HoTen} onChange={e => setForm({ ...form, HoTen: e.target.value })} />
        <input type="date" placeholder="Ngày sinh" className="border p-2 rounded" value={form.NgaySinh} onChange={e => setForm({ ...form, NgaySinh: e.target.value })} />
      </div>
      <input placeholder="Địa chỉ" className="border p-2 rounded w-full" value={form.DiaChi} onChange={e => setForm({ ...form, DiaChi: e.target.value })} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input placeholder="Email" className="border p-2 rounded" value={form.Email} onChange={e => setForm({ ...form, Email: e.target.value })} />
        <input placeholder="SĐT" className="border p-2 rounded" value={form.SDT} onChange={e => setForm({ ...form, SDT: e.target.value })} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input placeholder="Số CCCD" className="border p-2 rounded" value={form.CCCD} onChange={e => setForm({ ...form, CCCD: e.target.value })} />
        <select className="border p-2 rounded" value={form.HangDocGia} onChange={e => setForm({ ...form, HangDocGia: e.target.value })}>
          <option value="CoBan">CoBan</option>
          <option value="VIP">VIP</option>
          <option value="SV">SV</option>
          <option value="GV">GV</option>
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">Hủy</button>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Lưu</button>
      </div>
    </form>
  );
}

