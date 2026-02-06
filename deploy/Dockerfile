FROM php:8.3-apache

RUN a2enmod rewrite
RUN docker-php-ext-install pdo_mysql

COPY backend/api/ /var/www/html/api/
COPY frontend/ /var/www/html/

COPY deploy/apache/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY deploy/.htaccess /var/www/html/.htaccess