FROM node:18 AS server

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "start"]