export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const token = env.BOT_TOKEN;
    
    if (url.pathname === '/webhook' && request.method === 'POST') {
      const body = await request.json();
      const chatId = body.message?.chat?.id;
      const text = body.message?.text;
      
      if (text === '/start') {
        await fetch(https://api.telegram.org/bot${token}/sendMessage, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: 'Привет! Я бот по ортопедии. Пока работаю в тестовом режиме.' })
        });
      } else if (text) {
        await fetch(https://api.telegram.org/bot${token}/sendMessage, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: Твой вопрос: ${text}\n\n(Скоро подключу базу знаний по ортопедии) })
        });
      }
      return new Response('OK');
    }
    
    return new Response('Bot is running', { status: 200 });
  }
};
