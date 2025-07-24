from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd

# Initialize Flask app with custom folders
app = Flask(__name__, template_folder='frontend', static_folder='static')

# Load your trained crop recommendation model
model = joblib.load("crop_recommendation_model.pkl")

# Home route - renders index.html
@app.route('/')
def home():
    return render_template('index.html')

# Prediction API route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse JSON data from frontend
        data = request.get_json()

        # Extract input values
        N = float(data['N'])
        P = float(data['P'])
        K = float(data['K'])
        temperature = float(data['temperature'])
        humidity = float(data['humidity'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])

        # Convert to DataFrame for model prediction
        input_data = pd.DataFrame([[N, P, K, temperature, humidity, ph, rainfall]],
                                  columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])

        # Make prediction
        prediction = model.predict(input_data)[0]

        # Return prediction
        return jsonify({'crop': prediction})

    except Exception as e:
        return jsonify({'error': str(e)})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
