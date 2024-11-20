import React, { useState, useEffect } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I assist you today?', user: 'bot' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [faqData, setFaqData] = useState([]);

  // Fetch FAQ data from faq.txt
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await fetch('/faq.txt');
        const text = await response.text();
        const faqLines = text.split('\n').map(line => line.trim()).filter(line => line); // Split by new lines
        setFaqData(faqLines);
      } catch (error) {
        console.error('Failed to load FAQ data:', error);
      }
    };

    fetchFAQ();
  }, []);

  // Handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    const userMessage = userInput.trim();
    if (userMessage) {
      setMessages([...messages, { text: userMessage, user: 'user' }]);
      setUserInput('');
      // Process the message (you can implement custom logic here to show relevant FAQ responses)
      handleBotResponse(userMessage);
    }
  };

  // Handle bot response based on the user input
  const handleBotResponse = (userMessage) => {
    let botResponse = 'Sorry, I didn\'t understand that. Can I help you with something else?';
    
    // Check if the user is asking for FAQ (or some keywords in the message)
    if (userMessage.toLowerCase().includes('faq')) {
      botResponse = 'Here are some frequently asked questions:';
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, user: 'bot' },
      ]);
      
      // Add the FAQ data
      faqData.forEach((line, index) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: line, user: 'bot' },
        ]);
      });
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user === 'bot' ? 'bot' : 'user'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Ask a question..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
