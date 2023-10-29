from sqlalchemy import func
from app.db import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    images = db.relationship('ProductImages', backref='product', lazy=True)
    variants = db.relationship('Variant', backref='product', lazy=True)
    logo_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)
    logo = db.relationship('Image', foreign_keys=[logo_id], uselist=False, backref=db.backref('products_logo', lazy=True))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        product_dict = {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "created_at": self.created_at.strftime("%Y-%m-%dT%H:%M:%S") if self.created_at else None,
            "updated_at": self.updated_at.strftime("%Y-%m-%dT%H:%M:%S") if self.updated_at else None
        }
        if self.images:
            product_dict["images"] = [{"id": image.image_id, "url": image.image.url} for image in self.images]
        if self.logo:
            product_dict["logo"] = {"id": self.logo.id, "url": self.logo.url}
        if self.variants:
            product_dict["variants"] = [variant.to_dict() for variant in self.variants]
        return product_dict

class ProductImages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)
    image = db.relationship('Image', foreign_keys=[image_id], uselist=False, backref=db.backref('products_images', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}