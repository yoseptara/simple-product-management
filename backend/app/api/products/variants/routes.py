from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload

from app.models.product import Product
from app.models.variant import Variant, VariantImages
from app.models.image import Image
from app.db import db

variant_bp = Blueprint('variants', __name__)

@variant_bp.route('/', methods=['GET'])
def get(product_id):
    page_number = request.args.get('page', 1, type=int)
    page_size = request.args.get('pageSize', 10, type=int)

    product = Product.query.get_or_404(product_id)
    paginated_query = Variant.query.options(joinedload(Variant.images)).filter_by(product_id=product.id).paginate(page=page_number, per_page=page_size, error_out=False)

    variants = paginated_query.items
    variant_data = [variant.to_dict() for variant in variants]

    response = {
        "variants": variant_data,
        "total": paginated_query.total,
        "pages": paginated_query.pages,
        "page": page_number,
    }

    return jsonify(response), 200

@variant_bp.route('/<int:variant_id>', methods=['GET'])
def get_detail(product_id, variant_id):
    variant = Variant.query.options(
        joinedload(Variant.images),
    ).get(variant_id)
    
    if variant is None:
        return jsonify({"error": "Variant not found"}), 404

    variant_data = variant.to_dict()
    
    return jsonify(variant_data), 200

@variant_bp.route('/', methods=['POST'])
def create(product_id):
    if not request.is_json:
        return jsonify({"msg": "Request data must be in JSON format"}), 400
    
    data = request.get_json()
    
    product = Product.query.get_or_404(product_id)

    name = data.get('name')
    size = data.get('size')
    color = data.get('color')
    image_urls = data.get('image_urls', [])

    if not name:
        return jsonify({"msg": "Variant name is required"}), 400

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
    
    return jsonify(new_variant.to_dict()), 201

@variant_bp.route('/<int:variant_id>', methods=['PUT'])
def update(product_id, variant_id):
    if not request.is_json:
        return jsonify({"msg": "Request data must be in JSON format"}), 400
    
    data = request.get_json()
    
    Product.query.get_or_404(product_id)
    variant = Variant.query.get_or_404(variant_id)

    name = data.get('name')
    size = data.get('size')
    color = data.get('color')
    new_image_urls = data.get('image_urls', [])
    deleted_image_ids = data.get('deleted_image_ids', [])

    variant.name = name if name is not None else variant.name
    variant.size = size if size is not None else variant.size
    variant.color = color if color is not None else variant.color

    for image_id in deleted_image_ids:
        image = VariantImages.query.filter_by(variant_id=variant.id, image_id=image_id).first()
        if image:
            db.session.delete(image)

        db.session.flush()
        Image.query.filter_by(id=image_id).delete()

    if new_image_urls:
        new_images = [Image(url=url) for url in new_image_urls]
        db.session.add_all(new_images)
        db.session.flush()

        new_variant_images = [VariantImages(variant_id=variant.id, image_id=image.id) for image in new_images]
        db.session.add_all(new_variant_images)

    db.session.commit()
    return jsonify(variant.to_dict()), 200
