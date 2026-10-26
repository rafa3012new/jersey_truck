from flask import Flask, jsonify

# Importar configuración (preparado para ampliación)
# from config import config_by_name

# Inicializar aplicación Flask
app = Flask(__name__)

# Configuración básica (por ahora sin entorno específico)
app.config['JSON_SORT_KEYS'] = False


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Endpoint de verificación de estado del backend.
    Útil para comprobar que el esqueleto de Flask está funcionando.
    """
    return jsonify({
        "status": "ok",
        "message": "TruckFleet API funcionando correctamente",
        "version": "1.0.0",
        "backend": "Flask + Python"
    }), 200


# TODO: Registrar Blueprints desde routes/ cuando se añadan rutas
# Ejemplo:
# from routes.trucks import trucks_bp
# app.register_blueprint(trucks_bp, url_prefix='/api/trucks')


# Manejo de errores básico (preparado para ampliación)
@app.errorhandler(404)
def not_found(error):
    """Maneja errores 404 para endpoints de API."""
    return jsonify({
        "error": "Recurso no encontrado",
        "status": 404
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Maneja errores 500 internos."""
    return jsonify({
        "error": "Error interno del servidor",
        "status": 500
    }), 500


if __name__ == '__main__':
    # Ejecutar en modo desarrollo
    app.run(host='0.0.0.0', port=5000, debug=True)
