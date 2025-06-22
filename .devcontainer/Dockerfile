ARG VARIANT="8.3-bullseye"
FROM mcr.microsoft.com/devcontainers/php:${VARIANT}

ARG NODE_VERSION="20.11.0"

# Install specific Node.js version to match local environment
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION} && nvm alias default ${NODE_VERSION} 2>&1"; fi

# Install PHP extensions required for Laravel
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        libzip-dev \
        libicu-dev \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        libonig-dev \
        libxml2-dev \
        libpq-dev \
        libsqlite3-dev \
        unzip \
        git \
        curl \
        vim \
        nano \
        mysql-client \
        redis-tools

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        zip \
        intl \
        gd \
        mbstring \
        xml \
        pdo \
        pdo_mysql \
        pdo_pgsql \
        pdo_sqlite \
        bcmath \
        opcache \
        pcntl \
        exif

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install global npm packages
RUN su vscode -c "umask 0002 && npm install -g pnpm yarn"

# Set up PHP configuration to match local environment
RUN echo "memory_limit = 256M" >> /usr/local/etc/php/conf.d/memory-limit.ini \
    && echo "upload_max_filesize = 64M" >> /usr/local/etc/php/conf.d/upload.ini \
    && echo "post_max_size = 64M" >> /usr/local/etc/php/conf.d/upload.ini \
    && echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/execution.ini \
    && echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.enable_cli=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=128" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.interned_strings_buffer=8" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=4000" >> /usr/local/etc/php/conf.d/opcache.ini

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Switch back to vscode user
USER vscode

# Install Laravel installer globally
RUN composer global require laravel/installer

# Make sure global composer bin is in PATH
ENV PATH="/home/vscode/.composer/vendor/bin:${PATH}"
