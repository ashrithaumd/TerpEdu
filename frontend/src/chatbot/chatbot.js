// Initial suggestions
const initialSuggestions = [
    "What is TerpEdu?",
    "How do I log in?",
    "How do I enroll in a course?",
    "How do I check my grades?",
    "How do I contact my instructor?"
];

// Add initial suggestions as buttons
function loadInitialSuggestions() {
    const suggestionContainer = document.getElementById("suggestion-buttons");
    if (suggestionContainer) {
        initialSuggestions.forEach((suggestion) => {
            const button = document.createElement("button");
            button.textContent = suggestion;
            button.addEventListener("click", () => handleSuggestionClick(suggestion));
            suggestionContainer.appendChild(button);
        });
    }
}

// Handle suggestion button click
function handleSuggestionClick(question) {
    const userInput = document.getElementById("user-input");
    if (userInput) {
        userInput.value = question; // Populate input box
        sendMessage(); // Automatically send the message
    }
}

// Add event listeners only when DOM elements are available
function attachEventListeners() {
    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");

    if (sendButton && userInput) {
        sendButton.addEventListener("click", sendMessage);
        userInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    } else {
        console.error("Chatbot elements not found in the DOM.");
    }
}

// Function to send a message
function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    const chatMessages = document.getElementById("chat-messages");
    if (chatMessages) {
        chatMessages.innerHTML += `
            <div class="user-message">
                <div class="message">${userInput}</div>
            </div>
        `;

        // Add typing indicator
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("typing-indicator");
        typingIndicator.innerHTML = `
            <img src="/typing.gif" alt="Typing...">
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate delay for chatbot response
        setTimeout(() => {
            fetch("http://127.0.0.1:5000/chatbot/get_answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userInput })
            })
            .then(response => response.json())
            .then(data => {
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);

                // Add chatbot response
                chatMessages.innerHTML += `
                    <div class="bot-message">
                        <div class="message">${data.answer}</div>
                    </div>
                `;

                // Add follow-up suggestions based on the question
                loadFollowUpSuggestions(userInput);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            })
            .catch(() => {
                chatMessages.removeChild(typingIndicator);
                chatMessages.innerHTML += `
                    <div class="bot-message">
                        <div class="message">Sorry, I couldn't process your question.</div>
                    </div>
                `;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
        }, 3000);

        document.getElementById("user-input").value = "";
    }
}

// Add follow-up suggestions based on the previous question
function loadFollowUpSuggestions(question) {
    const suggestionContainer = document.getElementById("suggestion-buttons");
    if (suggestionContainer) {
        suggestionContainer.innerHTML = ""; // Clear old suggestions

        let followUpSuggestions = [];
        if (question.includes("log in")) {
            followUpSuggestions = [
                "What if I forget my password?",
                "How do I change my password?",
                "What are the login requirements?"
            ];
        } else if (question.includes("enroll")) {
            followUpSuggestions = [
                "What are the prerequisites for enrollment?",
                "How do I drop a course?",
                "Can I enroll in multiple courses at once?"
            ];
        } else if (question.includes("grades")) {
            followUpSuggestions = [
                "How do I check feedback on my assignments?",
                "Where can I find my overall GPA?",
                "How do I improve my grades?"
            ];
        }

        followUpSuggestions.forEach((suggestion) => {
            const button = document.createElement("button");
            button.textContent = suggestion;
            button.addEventListener("click", () => handleSuggestionClick(suggestion));
            suggestionContainer.appendChild(button);
        });
    }
}

// Load initial suggestions on page load and attach event listeners
window.onload = () => {
    loadInitialSuggestions();
    attachEventListeners();
};

// Exporting functions
export { loadInitialSuggestions, sendMessage };