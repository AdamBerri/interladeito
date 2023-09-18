FROM node:18

ENV DATABASE_URL ""
WORKDIR /usr/src/app

COPY package.json ./

RUN npm i --ignore-scripts --omit=dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]