# Frontend build stage
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM php:8.2-fpm-alpine

# system deps + sqlite
RUN apk add --no-cache \
  git \
  curl \
  libpng-dev \
  oniguruma-dev \
  libxml2-dev \
  zip \
  unzip \
  sqlite \
  sqlite-dev

# PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite mbstring exif pcntl \
  bcmath gd

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# install PHP deps
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader \
  --no-interaction --no-scripts

# copy app + assets
COPY . .
COPY --from=frontend-build /app/public/build ./public/build

# post-autoload
RUN composer run-script post-autoload-dump

# perms
RUN chown -R www-data:www-data /var/www \
  && chmod -R 755 /var/www/storage

# **Declare database folder as a volume**
VOLUME ["/var/www/database"]

EXPOSE 8000

# entrypoint: ensure sqlite file exists, then migrate & serve
CMD ["sh", "-c", "\
  if [ ! -f database/database.sqlite ]; then \
  touch database/database.sqlite && \
  chown www-data:www-data database/database.sqlite; \
  fi && \
  [ -z \"$APP_KEY\" ] && \
  php artisan key:generate --no-interaction --force || true && \
  php artisan migrate --force && \
  composer install --no-dev --optimize-autoloader && \
  php artisan db:seed --force && \
  php artisan serve --host=0.0.0.0 --port=8000\
  "]