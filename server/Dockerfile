FROM node:16.8.0

LABEL authors="Rohit Dalal<rohitdalal67@gmail.com>"

WORKDIR /app

# Set config npm & install dependencies
RUN npm install -g typescript ts-node

COPY package*.json ./

# USER node
# RUN npm ci --only=prod

RUN npm ci

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]
