FROM node:4

RUN npm install -g nodemon

COPY . /src

WORKDIR /src

RUN npm install 

EXPOSE 8080

CMD ["node", "server/app/start.js"]
