FROM node:24.7.0-alpine

# install pnpm
RUN npm install -g pnpm

WORKDIR /app

# install dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# copy all files
COPY ./src ./src
COPY main.js ./

CMD ["pnpm", "start"]

