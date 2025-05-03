const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/completions';

async function getBotResponse(message) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // يمكن تغييره إلى أي نموذج آخر تفضله
      prompt: message,
      max_tokens: 100,
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}
