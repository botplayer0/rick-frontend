FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set registry https://registry.npmmirror.com

RUN yarn

COPY . ./

RUN yarn build

FROM nginx:stable-alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]