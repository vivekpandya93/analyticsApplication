FROM mhart/alpine-node:4.2

MAINTAINER Luciano Colosio "luciano.colosio@namshi.com"

COPY . /src

WORKDIR /src

CMD ["node", "server/app/start.js"]
