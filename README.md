# Simple web app to share text.

## DockerHub releases
[https://hub.docker.com/r/novakovd/tsa/tags](https://hub.docker.com/r/novakovd/tsa/tags)

Images are tagged with short commit SHA.

## Docker compose
App can be launched using docker compose and DockerHub image

```
version: '3.1'

services:
  server:
    image: novakovd/tsa:<DOCKERHUB_TAG>
    ports:
      - "8080:8080"
    environment:
      - APP_HOSTNAME=<DESIRED_HOSTNAME>
      - APP_PROTO=<DESIRED_PROTOCOL>
    volumes:
      - /my/own/datadir:/app/data:rw
```

Available environment variables:

`APP_PORT` - port to start server on | default 8080

`APP_HOSTNAME` - application hostname | default localhost

`APP_PROTO` - application protocol (http or https) | default http

`MAX_TEXT_LENGTH` - max length of the text to share (min 1/max 1000) | default 500

## Local Development

```
# install dependencies
npm i

# run migrations and initialize database
npm run db:run:all

# build sources
npm run build:all

# start dev server
npm run start:dev
```