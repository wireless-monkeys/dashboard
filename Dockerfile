FROM nginx:1.21.4-alpine

COPY dist /var/www
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
