FROM php:8.2.20-fpm

RUN apt-get update
RUN apt-get install -y curl git
RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN apt-get install -y libonig-dev libpq-dev

RUN docker-php-ext-install mbstring
RUN docker-php-ext-enable mbstring

#RUN apt-get install -y zlib1g-dev zip libpng-dev

#RUN docker-php-ext-install gd
#RUN docker-php-ext-enable gd

RUN docker-php-ext-install opcache
RUN docker-php-ext-enable opcache

#RUN apt-get install -y php82-simplexml
#RUN docker-php-ext-install simplexml

RUN apt-get install -y libfreetype6-dev libjpeg62-turbo-dev
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) gd

RUN apt-get install -y libmagickwand-dev
RUN pecl install imagick
RUN docker-php-ext-enable imagick

WORKDIR /var/www/public_html

ENTRYPOINT [ "php-fpm" ]

# Создаем пользователя и группу с UID и GID 1000
RUN groupadd -g 1000 www-root && \
    useradd -u 1000 -g www-root -m www-root

# Переключаемся на пользователя appuser
USER www-root