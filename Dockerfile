FROM node:14.9 AS build
WORKDIR /build

ENV PATH /build/node_modules/.bin:$PATH

COPY package.json .
RUN npm i

COPY app app
RUN npx webpack -c app/webpack.config.js

FROM nginx:1.18
COPY nginx /etc/nginx
COPY --from=build /build/app/dist /etc/nginx/html
