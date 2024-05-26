# Используем официальный образ PostgreSQL как базовый
FROM postgres:latest

# Метаданные о контейнере (необязательно)
LABEL maintainer="Ваше имя <ваш.email@example.com>"

# Копируем дамп базы данных в контейнер
COPY ./db_scripts/production-management-db.sql /docker-entrypoint-initdb.d/

# Опционально: задаем переменные окружения для настройки пользователя, пароля и базы данных
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=Originrega
ENV POSTGRES_DB=production-management-db

# Опционально: указываем порт, на котором будет работать PostgreSQL (по умолчанию 5432)
# EXPOSE 5432

# Опционально: устанавливаем локаль (для правильной интерпретации данных в базе)
# ENV LANG en_US.utf8

# Опционально: задаем конфигурационные параметры PostgreSQL
# COPY ./postgresql.conf /etc/postgresql/postgresql.conf

# Опционально: указываем точку входа
# ENTRYPOINT ["docker-entrypoint.sh"]

# Опционально: устанавливаем параметры командной строки для запуска PostgreSQL
# CMD ["postgres"]
