FROM node:20.11.0-alpine
WORKDIR /usr/template-3

COPY package.json /usr/template-3/package.json
COPY yarn.lock /usr/template-3/yarn.lock
COPY packages/common /usr/template-3/packages/common
COPY packages/common-services /usr/template-3/packages/common-services
COPY services/bouncer/package.json /usr/template-3/services/bouncer/package.json

RUN yarn ci

COPY services/bouncer /usr/template-3/services/bouncer

EXPOSE $PORT

CMD ["yarn", "bouncer", "start:docker"]
