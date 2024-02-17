FROM node:20.11.0-alpine
WORKDIR /usr/template-3

COPY package.json /usr/template-3/package.json
COPY yarn.lock /usr/template-3/yarn.lock
COPY packages/common /usr/template-3/packages/common
COPY packages/common-services /usr/template-3/packages/common-services
COPY services/api/package.json /usr/template-3/services/api/package.json

RUN yarn ci

COPY services/api /usr/template-3/services/api

EXPOSE $PORT

CMD ["yarn", "api", "start:docker"]
