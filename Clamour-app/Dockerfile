FROM node:16.4.1

WORKDIR /Clamour-app
COPY package.json .
RUN npm install
COPY . .
EXPOSE ${NODE_DOCKER_PORT}
CMD npm run dev