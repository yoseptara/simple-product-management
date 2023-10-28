from sqlalchemy import func
from app import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    images = db.relationship('ProductImages', backref='product', lazy=True)
    logo_id = db.Column(db.Integer, db.ForeignKey('image.id', nullable=False))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

class ProductImages(db.Model):
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)