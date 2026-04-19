export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const token = env.BOT_TOKEN;
    const notebookUrl = env.NOTEBOOKLM_URL;

    if (url.pathname === '/webhook' && request.method === 'POST') {
      const body = await request.json();
      const chatId = body.message?.chat?.id;
      const userQuestion = body.message?.text;

      if (userQuestion === '/start') {
        await this.sendMessage(token, chatId, 'Привет! Я бот по ортопедии. Задавай вопросы по учебнику.');
        return new Response('OK');
      }

      if (userQuestion) {
        await this.sendMessage(token, chatId, 'Ищу ответ в учебнике. Подожди 15-20 секунд...');
        const answer = await this.getAnswerFromNotebook(notebookUrl, userQuestion);
        await this.sendMessage(token, chatId, answer);
        return new Response('OK');
      }
    }

    return new Response('Bot is running', { status: 200 });
  },

  async sendMessage(token, chatId, text) {
    const telegramUrl = 'https://api.telegram.org/bot' + token + '/sendMessage';
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text })
    });
  },

  async getAnswerFromNotebook(notebookUrl, question) {
    try {
      const askUrl = notebookUrl + '?q=' + encodeURIComponent(question);
      const response = await fetch(askUrl);
      const html = await response.text();
      
      const answerMatch = html.match(/class="answer-text">(.*?)</);
      if (answerMatch && answerMatch[1]) {
        return answerMatch[1].replace(/<[^>]*>/g, '');
      } else {
        return 'Не нашёл точного ответа. Попробуй переформулировать вопрос.';
      }
    } catch (error) {
      return 'Ошибка при поиске ответа. Попробуй позже.';
    }
  }
};
