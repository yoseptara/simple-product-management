from sqlalchemy import func
from app import db

class Variant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('person.id'), nullable=False)
    name = db.Column(db.String, nullable=False)
    size = db.Column(db.String)
    color = db.Column(db.String)
    images = db.relationship('VariantImages', backref='variant', lazy=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

class VariantImages(db.Model):
    variant_id = db.Column(db.Integer, db.ForeignKey('variant.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)