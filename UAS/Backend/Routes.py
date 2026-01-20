from flask import Blueprint, jsonify, request
from Models import db, Mahasiswa

api = Blueprint("api", __name__)

# ==========================
# GET ALL
# ==========================
@api.route("/mahasiswa", methods=["GET"])
def get_mahasiswa():
    data = Mahasiswa.query.all()
    return jsonify({
        "data": [m.to_dict() for m in data]
    })

# ==========================
# POST
# ==========================
@api.route("/mahasiswa", methods=["POST"])
def tambah_mahasiswa():
    data = request.get_json()

    if not data:
        return jsonify("Data kosong"), 400

    if not all(k in data for k in ("Nim", "Nama", "Prodi")):
        return jsonify("Field tidak lengkap"), 400

    if len(data["Nim"]) < 4:
        return jsonify("NIM tidak valid"), 400

    if Mahasiswa.query.filter_by(Nim=data["Nim"]).first():
        return jsonify("NIM sudah terdaftar"), 409

    mhs = Mahasiswa(
        Nim=data["Nim"],
        Nama=data["Nama"],
        Prodi=data["Prodi"]
    )

    db.session.add(mhs)
    db.session.commit()

    return jsonify(
        "Data berhasil ditambahkan"
    ), 201

# ==========================
# UPDATE
# ==========================
@api.route("/mahasiswa/<int:id>", methods=["PUT"])
def update_mahasiswa(id):
    mhs = Mahasiswa.query.get(id)

    if not mhs:
        return jsonify("Data tidak ditemukan"), 404

    data = request.get_json()

    mhs.Nim = data.get("Nim", mhs.Nim)
    mhs.Nama = data.get("Nama", mhs.Nama)
    mhs.Prodi = data.get("Prodi", mhs.Prodi)

    db.session.commit()

    return jsonify(
        "Data berhasil diupdate"
    )

# ==========================
# DELETE
# ==========================
@api.route("/mahasiswa/<int:id>", methods=["DELETE"])
def hapus_mahasiswa(id):
    mhs = Mahasiswa.query.get(id)

    if not mhs:
        return jsonify("Data tidak ditemukan"), 404

    db.session.delete(mhs)
    db.session.commit()

    return jsonify(
        "Data berhasil dihapus"
    )
