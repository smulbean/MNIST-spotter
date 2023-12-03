from flask import Flask, jsonify, request
from model import run_model, versions
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Display library versions at the root endpoint
@app.route('/')
def display_versions():
    versions()
    return "Library versions displayed in console."

# Define a new endpoint for running the model
@app.route('/predict', methods=['POST'])
def predict():
    # Check if an image file is present in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})


    # Get the file from the request
    image_file = request.files['image']

    # Save the file to a temporary location
    image_path = "temp_image.png"
    image_file.save(image_path)

    # Run the model on the saved image
    result = run_model(image_path)
    # Convert int64 to regular Python integer
    result = int(result)

    # Return the result as JSON
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
