FROM alpine:latest as BUILD

RUN apk add --no-cache nodejs npm
RUN npm install -g typescript

COPY . /app
WORKDIR /app

RUN chmod +x compile.sh
RUN sh compile.sh

FROM nginx:latest as RUNTIME
RUN rm -rf /usr/share/nginx/html/*
COPY --from=BUILD /app/build /usr/share/nginx/html
