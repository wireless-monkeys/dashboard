FROM node:18 AS build

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn

COPY . .
RUN yarn build

FROM nginx:1.21.4-alpine

COPY --from=build /app/dist /var/www
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
