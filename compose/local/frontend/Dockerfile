FROM node:lts

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY ./frontend/package-lock.json ./frontend/package.json ./
RUN npm ci
ENV PATH /app/node_modules/.bin:$PATH