from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from backend.app.models.product import Product
from backend.app.models.variant import Variant, VariantImages
from backend.app.models.image import Image

from app import db
from backend.app.api.products.variants import variant_bp



@variant_bp.route('/', methods=['GET'])
@jwt_required()
def get(product_id):
    product = Product.query.get_or_404(product_id)
    variants = Variant.query.filter_by(product_id=product.id).all()

    variant_data = [variant.to_dict() for variant in variants]

    return jsonify(variant_data), 200

@variant_bp.route('/', methods=['POST'])
@jwt_required()
def create(product_id):
    if not request.is_json:
        return jsonify({"msg": "Request new variant data JSON is not received"}), 400
    
    data = request.json
    
    product = Product.query.get_or_404(product_id)

    name = data.get('name', None)
    size = request.json.get('size', None)
    color = request.json.get('color', None)
    image_urls = request.json.get('image_urls', [])

    if not name or not product_id:
        return jsonify({"msg": "Product id or variant name are required"}), 400

    new_variant = Variant(product_id=product.id, name=name, size=size, color=color)
    db.session.add(new_variant)
    db.session.flush()

    if image_urls:
        new_images = [Image(url=url) for url in image_urls]
        db.session.add_all(new_images)
        db.session.flush()

        variant_images = [VariantImages(variant_id=new_variant.id, image_id=image.id) for image in new_images]
        db.session.add_all(variant_images)

    db.session.commit()
    
    return jsonify({"msg": "Variant has been created successfully"}), 200

@variant_bp.route('/<int:variant_id>', methods=['PUT'])
@jwt_required()
def update(product_id, variant_id):
    if not request.is_json:
        return jsonify({"msg": "Request new variant data JSON is not received"}), 400
    
    data = request.json
    
    Product.query.get_or_404(product_id)
    variant = Variant.query.get_or_404(variant_id)

    name = data.get('name', None)
    size = request.json.get('size', None)
    color = request.json.get('color', None)
    new_image_urls = request.json.get('image_urls', [])
    deleted_image_ids = data.get('deleted_image_ids', [])

    if not product_id or not variant_id:
        return jsonify({"msg": "Product id or variant id are required"}), 400
    
    variant.name = name
    variant.size = size
    variant.color = color

    for image_id in deleted_image_ids:
        image = VariantImages.query.filter_by(variant_id=variant.id, image_id=image_id).first()
        if image:
            db.session.delete(image)

        image = Image.query.get(image_id)
        if image:
            db.session.delete(image)

    if new_image_urls:
        new_images = [Image(url=url) for url in new_image_urls]
        db.session.add_all(new_images)
        db.session.flush()

        new_variant_images = [VariantImages(variant_id=variant.id, image_id=image.id) for image in new_images]
        db.session.add_all(new_variant_images)

    db.session.commit()
    return jsonify({"msg": "Variant has been updated successfully"}), 200