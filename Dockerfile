FROM node:7

WORKDIR /server

COPY package*.json ./
RUN npm install

COPY . /server

EXPOSE 4000

CMD npm start

