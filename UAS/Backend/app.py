from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from Models import db
from Routes import api

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(api)

@app.route("/")
def home():
    return jsonify({
        "status": True,
        "message": "Backend Flask PABW berjalan"
    })

if __name__ == "__main__":
    app.run(debug=True)
