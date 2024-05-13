# Используем за основу образ Node.js
FROM node:14

# Установим рабочую директорию в контейнере
WORKDIR /app

# Копируем все файлы в рабочую директорию
COPY . .

# Устанавливаем зависимости
RUN npm install

# Открываем порт 3000 для обращения к приложению
EXPOSE 3000

# Запускаем приложение при старте контейнера
CMD [ "node", "index.js" ]
