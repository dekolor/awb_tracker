FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm \
    sqlite \
    sqlite-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy composer files
COPY composer.json composer.lock ./

# Install composer dependencies WITHOUT running scripts
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Copy package files
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Now run composer scripts
RUN composer run-script post-autoload-dump

# Build frontend assets
RUN npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

# Create SQLite database file
RUN touch /var/www/database/database.sqlite \
    && chown www-data:www-data /var/www/database/database.sqlite

EXPOSE 8000

CMD ["sh", "-c", "[ -z \"$APP_KEY\" ] && php artisan key:generate --no-interaction --force || true; php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000"]