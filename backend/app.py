from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.simulation_routes import simulation_bp
from routes.chat_routes import chat_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(simulation_bp)
app.register_blueprint(chat_bp)

@app.route('/')
def index():
    return {"status": "Fluid Simulation API is running"}

if __name__ == '__main__':
    print("Starting server on http://localhost:5000")
    app.run(debug=True, port=5000)
