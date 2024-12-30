FROM node:20

WORKDIR /root/app

COPY package*.json .

COPY yarn*.lock .

RUN yarn config set network-timeout 3000000

RUN yarn install --force
# RUN npm install --force

COPY . .


EXPOSE 3000

CMD [ "yarn","dev"]

