FROM node:18.14.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN cp .env.variables .env
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
