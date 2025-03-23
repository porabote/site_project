###Install



DOCKER
docker compose up -d - создать контейнеры
docker-compose down - удалить все контейнеры
(или конкретный docker container rm 7cb16e1e5b4b_zaborstoit_mysql)

docker ps -a - список всех контейнеров
docker logs client_site - просмотреть логи контейнера

#docker rm $(docker ps --filter status=exited -q) - удалить все остановленные контейнеры


docker exec -it php_prb sh - войти в докер под shell

docker inspect --format='{{.Name}} {{.HostConfig.RestartPolicy.Name}}' $(docker ps -aq) - покажет имя каждого контейнера и соответствующую политику перезапуска

Права доступа на папки и пользователи
на хосте
chown www-data:www-root /путь/к/папке
usermod -a -G www-data www-root  //добавляем пользователя www-root в группу www-data
chmod 775 /путь/к/папке
chmod g+s /путь/к/папке
в контейнере
groupadd -g 1000 www-root
useradd -u 1000 -g www-root -m -s /bin/bash www-root



Проблемы
502 Bad Gateway
проверить все ли контейнеры активны, посмотреть логи почему не запустилось docker logs project_alias_nginx

403 Forbidden
проверить логи /var/www/www-root/zaborstoit.project/nginx/httpd-logs/error.log
