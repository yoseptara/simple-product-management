import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

migrate = Migrate(app, db)

from app.auth import auth_bp
from app.api.products import product_bp
from app.api.products.variants import variant_bp

app.register_blueprint(auth_bp)
product_bp.register_blueprint(variant_bp, url_prefix='/<int:product_id>/variants')
app.register_blueprint(product_bp)

@app.route("/")
def health_check():
    return jsonify({"msg": "Server is running"}), 200

@app.errorhandler(Exception)
def handle_unexpected_error(error):
    app.logger.error('An unexpected error occurred', exc_info=True)
    return jsonify({"msg": "An unexpected error occurred"}), 500
