FROM node:18 AS client

WORKDIR /usr/src/client

COPY package*.json ./

RUN npm install

COPY . /usr/src/client

RUN npm run build

FROM ubuntu

RUN apt-get update
RUN apt-get install nginx -y

COPY --from=client /usr/src/client/dist/ /var/www/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]