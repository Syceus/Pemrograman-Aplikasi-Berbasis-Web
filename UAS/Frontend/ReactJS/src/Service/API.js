// =======================================
// FILE: src/Service/API.js
// Fungsi: Layer komunikasi dengan backend Flask
// =======================================

// URL backend Flask
const BASE_URL = "http://localhost:5000";

// -------------------------------
// GET: Ambil semua data
// -------------------------------
export const getMahasiswa = async () => {
  const res = await fetch(`${BASE_URL}/mahasiswa`);
  return res.json();
};

// -------------------------------
// POST: Tambah data baru
// -------------------------------
export const createMahasiswa = async (data) => {
  const res = await fetch(`${BASE_URL}/mahasiswa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// -------------------------------
// PUT: Update data
// -------------------------------
export const updateMahasiswa = async (id, data) => {
  const res = await fetch(`${BASE_URL}/mahasiswa/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// -------------------------------
// DELETE: Hapus data
// -------------------------------
export const deleteMahasiswa = async (id) => {
  const res = await fetch(`${BASE_URL}/mahasiswa/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
