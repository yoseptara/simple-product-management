from flask import request, jsonify
from flask_jwt_extended import jwt_required

from app.models.product import Product, ProductImages
from app.models.image import Image

from app import db
from app.api.products import product_bp


@product_bp.route('/', methods=['GET'])
@jwt_required()
def get():
    products = Product.query.all()

    product_data = [product.to_dict() for product in products]

    return jsonify(product_data), 200

@product_bp.route('/', methods=['POST'])
@jwt_required()
def create():
    if not request.is_json:
        return jsonify({"msg": "Request new product data JSON is not received"}), 400
    
    data = request.json
    
    name = data.get('name', None)
    description = request.json.get('description:', None)
    image_urls = request.json.get('image_urls', [])
    logo_url = request.json.get('logo_url', None)

    if not name:
        return jsonify({"msg": "Product name is required"}), 400
    
    new_logo_image = Image(url=logo_url)
    db.session.add(new_logo_image)
    db.session.flush()

    new_product = Product(name=name, description=description, logo_id=new_logo_image.id)
    db.session.add(new_product)

    image_objects = [Image(url=image_url) for image_url in image_urls]
    db.session.add_all(image_objects)
    db.session.flush()

    product_images = [ProductImages(product_id=new_product.id, image_id=image.id) for image in image_objects]
    db.session.add_all(product_images)
    db.session.commit()
    
    return jsonify({"msg": "Product created successfully"}), 200

@product_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
def update(product_id):
    if not request.is_json:
        return jsonify({"msg": "Request new product data JSON is not received"}), 400

    data = request.json
    name = data.get('name')
    description = data.get('description')
    new_image_urls = data.get('image_urls', [])
    logo_url = data.get('logo_url')
    deleted_image_ids = data.get('deleted_image_ids', [])

    if not name:
        return jsonify({"msg": "Product name is required"}), 400

    product = Product.query.get_or_404(product_id)

    if logo_url:
        logo = Image(url=logo_url)
        db.session.add(logo)
        db.session.flush()
        product.logo_id = logo.id

    product.name = name
    product.description = description

    for image_id in deleted_image_ids:
        image = ProductImages.query.filter_by(product_id=product.id, image_id=image_id).first()
        if image:
            db.session.delete(image)

        image = Image.query.get(image_id)
        if image:
            db.session.delete(image)

    if new_image_urls:
        new_images = [Image(url=url) for url in new_image_urls]
        db.session.add_all(new_images)
        db.session.flush()

        new_product_images = [ProductImages(product_id=product.id, image_id=image.id) for image in new_images]
        db.session.add_all(new_product_images)

    db.session.commit()
    return jsonify({"msg": "Product updated successfully"}), 200