FROM node:17-alpine3.12

ARG APP_DIR=/usr/src/app
WORKDIR $APP_DIR

COPY . $APP_DIR
RUN rm -rf ./node_modules
RUN npm ci --production --quiet

CMD npm run start
