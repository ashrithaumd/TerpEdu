from flask import Blueprint, request, jsonify
from fuzzywuzzy import process

# Create a Flask Blueprint for chatbot-related routes
chatbot_bp = Blueprint("chatbot", __name__)

# Load FAQs from the text file
def load_faqs():
    faqs = {}
    with open("data/faq.txt", "r") as file:
        for line in file:
            questions, answer = line.strip().split("::")
            for question in questions.split("|"):  # Handle multiple synonyms
                faqs[question.lower()] = answer
    return faqs

FAQS = load_faqs()

# Find the best matching question using fuzzy matching
def find_best_match(user_question):
    faq_keys = list(FAQS.keys())
    match, score = process.extractOne(user_question, faq_keys)
    if score > 80:  # Threshold for fuzzy match
        return FAQS[match]
    return None

# Define route to handle chatbot queries
@chatbot_bp.route("/get_answer", methods=["POST"])
def get_answer():
    data = request.get_json()
    question = data.get("question", "").lower()

    # Handle greetings separately
    greetings = ["hello", "hi", "hey", "greetings", "howdy", "what's up"]
    if any(greet in question for greet in greetings):
        return jsonify({"answer": "Hello! How can I assist you today? 😊"})

    # Get a response from FAQs
    answer = find_best_match(question)
    if answer:
        return jsonify({"answer": answer})
    else:
        return jsonify({"answer": "I'm sorry, I couldn't understand your question. Please try rephrasing or check the FAQ."})
