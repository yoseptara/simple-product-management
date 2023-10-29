from sqlalchemy import func
from app.db import db

class Variant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    size = db.Column(db.String(255))
    color = db.Column(db.String(255))
    images = db.relationship('VariantImages', backref='variant', lazy=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        variant_dict = {
            "id": self.id,
            "product_id": self.product_id,
            "name": self.name,
            "size": self.size,
            "color": self.color,
            "created_at": self.created_at.strftime("%Y-%m-%dT%H:%M:%S") if self.created_at else None,
            "updated_at": self.updated_at.strftime("%Y-%m-%dT%H:%M:%S") if self.updated_at else None,
        }
        if self.images:
            variant_dict["images"] = [{"id": image.image_id, "url": image.image.url} for image in self.images]
        return variant_dict

class VariantImages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    variant_id = db.Column(db.Integer, db.ForeignKey('variant.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)
    image = db.relationship('Image', foreign_keys=[image_id], uselist=False, backref=db.backref('variants_images', lazy=True))

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
