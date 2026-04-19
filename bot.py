import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# СЮДА ВСТАВЬ СВОЙ ТОКЕН ОТ @BotFather
TOKEN = "8390112746:AAEQMj-cglBXi0cZlqXqKgPjSw5advzxfVs"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Привет! Я бот по ортопедии. Задавай вопросы.")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_question = update.message.text
    # Пока просто отвечаем тем же (потом заменишь на запрос к NotebookLM)
    await update.message.reply_text(f"Твой вопрос: {user_question}\n\n(Пока отвечаю заглушкой, скоро подключу базу знаний)")

def main():
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    print("Бот запущен...")
    app.run_polling()

if __name__ == "__main__":
    main()
