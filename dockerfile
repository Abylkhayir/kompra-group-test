# Используйте node:18.18.0 как базовый образ
FROM node:18.18.0 as build-env
WORKDIR /app

# Копируйте файлы package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Установите Angular CLI глобально внутри образа
RUN npm install -g @angular/cli

# Копируйте остальные файлы проекта
COPY . .

# Выполните сборку проекта. Укажите необходимый конфигурационный файл, если нужно
RUN ng build

# Подготовьте окончательный образ с использованием Nginx для раздачи собранных файлов
FROM nginx:1.25.2-alpine

# Настройка Nginx
RUN echo -e " \n\
server { \n\
    listen 80;\n\
    server_name _;\n\
    client_max_body_size 200M;\n\
    client_body_buffer_size 20M;\n\
    client_header_buffer_size 20M;\n\
    large_client_header_buffers 16 20k;\n\
    root /usr/share/nginx/html;\n\
    location / {\n\
        try_files \$uri \$uri/ /index.html;\n\
        add_header Cache-Control \"public, max-age=43200\";\n\
    }\n\
}\n" > /etc/nginx/conf.d/default.conf

# Копируйте собранные файлы из предыдущего образа
COPY --from=build-env /app/dist/browser /usr/share/nginx/html
