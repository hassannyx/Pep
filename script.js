const chatForm = document.getElementById('chat-form');
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

// إضافة مفتاح API الخاص بك من OpenAI هنا
const API_KEY = 'YOUR_OPENAI_API_KEY'; // استبدل بـ مفتاح API الخاص بك
const ENDPOINT = 'https://api.openai.com/v1/completions';

// إضافة بعض الرسائل المبدئية
const initialMessages = [
  "مرحبًا! أنا شات بوت AI. كيف يمكنني مساعدتك اليوم؟",
  "إذا كنت بحاجة للمساعدة، فقط اكتب السؤال وسأجيب عليك!"
];

const loadingMessage = "جارٍ معالجة طلبك...";

let conversationHistory = [];  // لتخزين المحادثات السابقة

// إضافة الرسائل الأولية عند فتح الموقع
initialMessages.forEach(msg => {
  chatLog.innerHTML += `<div class="bot-message">${msg}</div>`;
});

chatLog.scrollTop = chatLog.scrollHeight;

// إظهار الرسالة أثناء الانتظار
function showLoading() {
  chatLog.innerHTML += `<div class="bot-message loading">${loadingMessage}</div>`;
  chatLog.scrollTop = chatLog.scrollHeight;
}

// إخفاء الرسالة أثناء الانتظار بعد استلام الرد
function hideLoading() {
  const loadingElement = chatLog.querySelector('.loading');
  if (loadingElement) {
    loadingElement.remove();
  }
}

// التعامل مع إرسال النموذج
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userMessage = userInput.value;
  if (userMessage.trim() === "") return;

  // عرض السؤال في واجهة الدردشة
  chatLog.innerHTML += `<div class="user-message">${userMessage}</div>`;
  userInput.value = '';
  chatLog.scrollTop = chatLog.scrollHeight;

  // حفظ المحادثة
  conversationHistory.push({ role: 'user', content: userMessage });

  // إظهار رسالة الانتظار
  showLoading();

  // إرسال السؤال إلى API الخاص بـ OpenAI
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: generatePrompt(),
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    // عرض إجابة البوت في واجهة الدردشة
    const botMessage = data.choices[0].text.trim();
    chatLog.innerHTML += `<div class="bot-message">${botMessage}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;

    // حفظ المحادثة
    conversationHistory.push({ role: 'assistant', content: botMessage });
    hideLoading();
  } catch (error) {
    hideLoading();
    chatLog.innerHTML += `<div class="bot-message">حدث خطأ، يرجى المحاولة مرة أخرى.</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  }
});

// إنشاء نص المحادثة بناءً على المحادثات السابقة
function generatePrompt() {
  return conversationHistory.map(msg => `${msg.role === 'user' ? 'أنت: ' : 'البوت: '}${msg.content}`).join('\n');
}
