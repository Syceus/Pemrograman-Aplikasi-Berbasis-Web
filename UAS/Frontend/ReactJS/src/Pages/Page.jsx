// =======================================
// FILE: src/Pages/Page.jsx
// Fungsi: Layout utama halaman CRUD
// =======================================

import { useState } from "react";
import Create from "../Components/Create";
import List from "../Components/List";

export default function Page() {
  // Trigger reload data tabel
  const [refresh, setRefresh] = useState(false);

  // Menyimpan data yang sedang diedit
  const [editData, setEditData] = useState(null);

  return (
    <div className="container py-4">
      {/* HEADER KIRI ATAS (GAYA KAMPUS) */}
      <div className="mb-4">
        <div className="page-title">Manajemen Data Mahasiswa</div>
        <div className="page-subtitle">
          Frontend React JS & Backend Flask
        </div>
      </div>

      <div className="row">
        {/* FORM TAMBAH DATA */}
        <div className="col-md-4 mb-4">
          <Create
            onSuccess={() => setRefresh(!refresh)}
          />
        </div>

        {/* AREA DATA */}
        <div className="col-md-8">
          {/* FORM EDIT TERPISAH */}
          {editData && (
            <div className="edit-panel mb-3">
              <Create
                editData={editData}
                clearEdit={() => setEditData(null)}
                onSuccess={() => {
                  setRefresh(!refresh);
                  setEditData(null);
                }}
              />
            </div>
          )}

          {/* TABEL DATA */}
          <List
            refresh={refresh}
            onEdit={(data) => setEditData(data)}
          />
        </div>
      </div>
    </div>
  );
}
