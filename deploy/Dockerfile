FROM node:20 AS frontend-build
WORKDIR /app

COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM php:8.3-apache

RUN a2enmod rewrite

COPY backend/ /var/www/html/api/
COPY --from=frontend-build /app/frontend/dist/ /var/www/html/

COPY deploy/apache/000-default.conf /etc/apache2/sites-available/000-default.conf
