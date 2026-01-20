// =======================================
// FILE: src/Components/List.jsx
// Fungsi: Menampilkan tabel data
// =======================================

import { useEffect, useState } from "react";
import {
  getMahasiswa,
  deleteMahasiswa,
} from "../Service/API";

export default function List({ refresh, onEdit }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  // Ambil data dari backend
  const loadData = async () => {
    const res = await getMahasiswa();
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, [refresh]);

  // Filter search
  const filtered = data.filter((d) =>
    `${d.Nim} ${d.Nama} ${d.Prodi}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination
  const start = (page - 1) * limit;
  const current = filtered.slice(start, start + limit);
  const totalPage = Math.ceil(filtered.length / limit);

  return (
    <div className="card shadow">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Data Mahasiswa</h5>

        <input
          className="form-control search-input mb-3"
          placeholder="Cari data..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Prodi</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {current.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Data Tidak Ada
                </td>
              </tr>
            ) : (
              current.map((m) => (
                <tr key={m.id}>
                  <td>{m.Nim}</td>
                  <td>{m.Nama}</td>
                  <td>{m.Prodi}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(m)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteMahasiswa(m.id).then(loadData)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          {[...Array(totalPage)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm pagination-btn me-1 ${
                page === i + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
