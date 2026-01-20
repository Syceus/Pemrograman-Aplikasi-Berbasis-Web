// =======================================
// FILE: src/App.jsx
// Fungsi: Root component React
// =======================================

import Page from "./Pages/Page";

export default function App() {
  return (
    <>
      {/* Navbar sederhana ala kampus */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand fw-bold">
            Sistem Informasi Akademik
          </span>
        </div>
      </nav>

      {/* Konten utama */}
      <Page />
    </>
  );
}
