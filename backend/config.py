import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    """Clase base de configuración para la aplicación Flask."""

    # Clave secreta
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-me'

    # URL de conexión a base de datos (MySQL + PyMySQL)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql+pymysql://root:localhost@localhost:3306/truckfleet_db'

    # Desactivar seguimiento de modificaciones (reduce overhead)
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Configuraciones extra
    JSON_SORT_KEYS = False


class DevelopmentConfig(Config):
    """Configuración para entorno de desarrollo."""
    DEBUG = True
    TESTING = False


class ProductionConfig(Config):
    """Configuración para entorno de producción."""
    DEBUG = False
    TESTING = False


class TestingConfig(Config):
    """Configuración para entorno de pruebas."""
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


# Diccionario de configuraciones
config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
