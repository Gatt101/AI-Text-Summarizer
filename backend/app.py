from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from transformers import pipeline

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)  # This allows all origins bvy default

# Initialize the summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Home route
@app.route('/')
def home():
    return "Hello, World! This is the Flask Summarizer Backend."

# Summarizer endpoint
@app.route('/summarize', methods=['POST'])
def summarize():
    # Get the input text from the request
    data = request.json

    # Check if the 'text' field is provided in the request
    if 'text' not in data:
        return jsonify({"error": "Please provide 'text' in the request body"}), 400

    input_text = data['text']

    # Summarize the input text
    try:
        summary = summarizer(input_text, max_length=130, min_length=30, do_sample=False)
        # Return the summarized text as a JSON response
        return jsonify({"summary": summary[0]['summary_text']})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)