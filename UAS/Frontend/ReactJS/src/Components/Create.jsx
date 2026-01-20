// =======================================
// FILE: src/Components/Create.jsx
// Fungsi: Form tambah & edit data
// =======================================

import { useEffect, useState } from "react";
import {
  createMahasiswa,
  updateMahasiswa,
} from "../Service/API";

export default function Create({ onSuccess, editData, clearEdit }) {
  // State form input
  const [form, setForm] = useState({
    Nim: "",
    Nama: "",
    Prodi: "",
  });

  // Jika mode edit → isi form otomatis
  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  // Handle perubahan input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editData) {
      await updateMahasiswa(editData.id, form);
      alert("Data berhasil diperbarui");
      clearEdit();
    } else {
      await createMahasiswa(form);
      alert("Data berhasil ditambahkan");
    }

    setForm({ Nim: "", Nama: "", Prodi: "" });
    onSuccess();
  };

  return (
    <div className="card shadow-sm p-4">
      <h5 className="fw-bold mb-3">
        {editData ? "Edit Data Mahasiswa" : "Tambah Data Mahasiswa"}
      </h5>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">NIM</label>
          <input
            className="form-control"
            name="Nim"
            value={form.Nim}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input
            className="form-control"
            name="Nama"
            value={form.Nama}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Prodi</label>
          <input
            className="form-control"
            name="Prodi"
            value={form.Prodi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary w-100">
            Simpan
          </button>

          {editData && (
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={clearEdit}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
