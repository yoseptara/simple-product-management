import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
from .db import db

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "*"}})

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

db.init_app(app)

migrate = Migrate(app, db)

from app.api.products.routes import product_bp
from app.api.products.variants.routes import variant_bp

product_bp.register_blueprint(variant_bp, url_prefix='/<int:product_id>/variants')
app.register_blueprint(product_bp)

@app.route("/")
def health_check():
    return jsonify({"msg": "Server is running"}), 200

@app.errorhandler(Exception)
def handle_unexpected_error(error):
    app.logger.error('An unexpected error occurred', exc_info=True)
    return jsonify({"msg": "An unexpected error occurred"}), 500
