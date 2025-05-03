const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const userMessage = userInput.value.trim();
  if (userMessage === '') return;

  addMessage(userMessage, 'user');
  userInput.value = '';
  
  const botResponse = await getBotResponse(userMessage);
  addMessage(botResponse, 'bot');
});

function addMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatLog.appendChild(messageElement);
  
  // Scroll to the bottom
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function getBotResponse(message) {
  // Here, you would integrate with your API or AI model, such as GPT
  // For now, we return a mock response
  
  const mockResponses = [
    "أهلاً، كيف يمكنني مساعدتك؟",
    "هذا سؤال مثير! دعني أفكر...",
    "أريد مساعدتك في كل ما تحتاجه!",
    "هل لديك المزيد من الأسئلة؟"
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResponses[Math.floor(Math.random() * mockResponses.length)]);
    }, 1000); // Mock delay
  });
}
