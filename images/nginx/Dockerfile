FROM nginx

# Создаем пользователя и группу
RUN groupadd -g 1000 www-root && \
    useradd -u 1000 -g www-root -m www-root

# Меняем пользователя на 1000:1000
RUN usermod -u 1000 nginx && groupmod -g 1000 nginx

RUN chown -R 1000:1000 /var/cache/nginx /var/log/nginx /var/www/httpd-logs && \
    chmod -R 755 /var/cache/nginx /var/log/nginx /var/www/httpd-logs

WORKDIR /var/www/public_html

CMD ["nginx", "-g", "daemon off;"]