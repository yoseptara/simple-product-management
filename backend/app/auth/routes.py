from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from app.models.user import User

from app import bcrypt
from app.auth import auth_bp

@auth_bp.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Request login credential JSON is not received"}), 400
    
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if not email or not password:
        return jsonify({"msg": "Email and password is required"}), 400

    user = User.query.filter.by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={'id': user.id, 'email': email})
        return jsonify(access_token=access_token), 200
    
    return jsonify({"msg": "Invalid email or password"}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing request register credential JSON"}), 400
    
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if not email or not password:
        return jsonify({"msg": "Request login credential JSON is not received"})
    
    user = User.query.filter.by(email=email).first()
    if user:
        return jsonify({"msg": "User already exists"}), 400

    return jsonify({"msg": "User has been successfully registered"}), 200
    