FROM node:16

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN npm install
COPY . .
# Dirty hack for migration
COPY ./prisma ./prisma_backup 
RUN npx prisma generate

RUN npm run build

RUN npm install --production

ARG TOKEN
ENV TOKEN=$TOKEN
ENV NODE_ENV production

CMD [ "node", "build/index.js" ]