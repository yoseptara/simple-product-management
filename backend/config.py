import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
    JWT_ACCESS_TOKEN_EXPIRES = int(os.environ['JWT_ACCESS_TOKEN_EXPIRES'])
    FLASK_APP = os.environ['FLASK_APP']
    FLASK_RUN_HOST = os.environ['FLASK_RUN_HOST']
    MYSQL_ROOT_PASSWORD = os.environ['MYSQL_ROOT_PASSWORD']
    MYSQL_DATABASE = os.environ['MYSQL_DATABASE']
    MYSQL_USER = os.environ['MYSQL_USER']
    MYSQL_HOST = os.environ['MYSQL_HOST']
    MYSQL_PORT = os.environ['MYSQL_PORT']

    SQLALCHEMY_DATABASE_URI = f'mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_ROOT_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}'

    def validate_required_fields():
        required_fields = ['FLASK_APP', 'FLASK_RUN_HOST','JWT_SECRET_KEY', 'JWT_ACCESS_TOKEN_EXPIRES', 'MYSQL_ROOT_PASSWORD', 'MYSQL_DATABASE','MYSQL_USER','MYSQL_HOST','MYSQL_PORT']
        for field in required_fields:
            if getattr(Config, field, None) is None:
                raise ValueError(f"Config validation error: field '{field}' is required")

Config.validate_required_fields()
