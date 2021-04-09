# this dockerfile creates an image with all the frontend code generated
FROM node:lts

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY ./frontend/package-lock.json ./frontend/package.json ./
RUN npm ci
ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node:node ./frontend/src/ ./src
COPY --chown=node:node ./frontend/public/ ./public

RUN npm run build
