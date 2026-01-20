from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Mahasiswa(db.Model):
    __tablename__ = "mahasiswa"

    id = db.Column(db.Integer, primary_key=True)
    Nim = db.Column(db.String(13), nullable=False)
    Nama = db.Column(db.String(100), nullable=False)
    Prodi = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "Nim": self.Nim,
            "Nama": self.Nama,
            "Prodi": self.Prodi
        }
