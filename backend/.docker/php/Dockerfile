FROM php:8.2-fpm
MAINTAINER andreas@docs-dangit.dev

# persistent / runtime deps
ENV PHPIZE_DEPS \
    autoconf \
    cmake \
    file \
    g++ \
    gcc \
    libc-dev \
    libpcre2-dev \
    make \
    git \
    pkgconf \
    re2c \
    # for GD
    libfreetype6-dev \
    libpng-dev  \
    libjpeg-dev
RUN apt-get update && apt-get install -y \
    # for intl extension
    libicu-dev \
    # for soap
    libxml2-dev \
    # for GD
    libpng-dev \
    libsodium-dev \
    libzip-dev \
    libpcre2-dev \
    libfreetype6-dev \
    libjpeg-dev \
    libc-client-dev \
    libkrb5-dev \
    libmagickwand-dev \
    gpg

RUN set -xe \
    # workaround for rabbitmq linking issue
    && apt-get install -y\
        $PHPIZE_DEPS \
    && docker-php-ext-configure gd \
    && docker-php-ext-configure bcmath --enable-bcmath \
    && docker-php-ext-configure intl --enable-intl \
    && docker-php-ext-configure pcntl --enable-pcntl \
    && docker-php-ext-configure pdo_mysql \
    && docker-php-ext-configure mysqli \
    && docker-php-ext-configure soap --enable-soap \
    && docker-php-ext-configure zip \
    && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
    && docker-php-ext-install -j$(nproc) \
        gd \
        bcmath \
        intl \
        pcntl \
        pdo_mysql \
        mysqli \
        soap \
        iconv \
        zip \
        sockets \
        opcache \
        sodium \
        imap \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && pecl install imagick \
    && docker-php-ext-enable imagick
RUN pecl install xdebug \
 && docker-php-ext-enable xdebug \
 && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
 && echo "xdebug.discover_client_host=on" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini


WORKDIR /var/www/docks.dangit

RUN EXPECTED_CHECKSUM="$(php -r 'copy("https://composer.github.io/installer.sig", "php://stdout");')" \
 && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
 && ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")" \
 && if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]; then rm composer-setup.php ; exit 1; fi \
 && php composer-setup.php --quiet \
 && rm composer-setup.php \
 && mv ./composer.phar /usr/local/bin/composer \
 && chmod 755 /usr/local/bin/composer

RUN curl -Lo phive.phar https://phar.io/releases/phive.phar \
 && curl -Lo phive.phar.asc https://phar.io/releases/phive.phar.asc \
 && gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys 0x9D8A98B29B2D5D79 \
 && gpg --verify phive.phar.asc phive.phar \
 && chmod +x phive.phar \
 && mv phive.phar /usr/local/bin/phive

