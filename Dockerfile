# Aşama 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Aşama 2: Prod için nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .

# nginx ayar dosyası
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
