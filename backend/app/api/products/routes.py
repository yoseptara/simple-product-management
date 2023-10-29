from flask import request, jsonify, Blueprint
from sqlalchemy.orm import joinedload

from ...db import db
from ...models.product import Product, ProductImages
from ...models.image import Image

product_bp = Blueprint('products', __name__, url_prefix='/products')

@product_bp.route('/', methods=['GET'])
def get():
    page_number = request.args.get('page', 1, type=int)
    page_size = request.args.get('pageSize', 10, type=int)

    paginated_query = Product.query.options(
        joinedload(Product.logo),
        joinedload(Product.images)
    ).paginate(page=page_number, per_page=page_size, error_out=False)

    products = paginated_query.items
    product_data = [product.to_dict() for product in products]

    response = {
        "products": product_data,
        "total": paginated_query.total,
        "pages": paginated_query.pages,
        "page": page_number,
    }

    return jsonify(response), 200

@product_bp.route('/<int:product_id>', methods=['GET'])
def get_detail(product_id):
    product = Product.query.options(
        joinedload(Product.logo),
        joinedload(Product.images),
        joinedload(Product.variants)
    ).get(product_id)
    
    if product is None:
        return jsonify({"error": "Product not found"}), 404

    product_data = product.to_dict()
    
    return jsonify(product_data), 200

@product_bp.route('/', methods=['POST'])
def create():
    if not request.is_json:
        return jsonify({"msg": "Request new product data JSON is not received"}), 400

    data = request.json

    print(f"check received json : ${data}" )
    name = data.get('name')
    description = data.get('description')
    image_urls = data.get('image_urls', [])
    logo_url = data.get('logo_url')

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
