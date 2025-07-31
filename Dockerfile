# Build stage
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage  
FROM php:8.2-fpm-alpine
RUN apk add --no-cache git curl libpng-dev oniguruma-dev libxml2-dev zip unzip sqlite sqlite-dev
RUN docker-php-ext-install pdo pdo_sqlite mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www

# Copy composer files and install PHP deps
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy app code
COPY . .
# Copy pre-built assets from build stage
COPY --from=frontend-build /app/public/build ./public/build

RUN composer run-script post-autoload-dump
RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www/storage
RUN touch /var/www/database/database.sqlite && chown www-data:www-data /var/www/database/database.sqlite

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8000
CMD ["/start.sh"]