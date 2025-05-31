FROM node:22

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

# CMD ["sh", "-c", "yarn migration:run"]
CMD ["yarn", "start:dev"]