export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const token = env.BOT_TOKEN;
    
    if (url.pathname === '/webhook' && request.method === 'POST') {
      const body = await request.json();
      const chatId = body.message?.chat?.id;
      const text = body.message?.text;
      
      if (text === '/start') {
        const telegramUrl = 'https://api.telegram.org/bot' + token + '/sendMessage';
        await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: 'Привет! Я бот по ортопедии.' })
        });
      } else if (text) {
        const telegramUrl = 'https://api.telegram.org/bot' + token + '/sendMessage';
        await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: 'Твой вопрос: ' + text })
        });
      }
      return new Response('OK');
    }
    
    return new Response('Bot is running', { status: 200 });
  }
};
