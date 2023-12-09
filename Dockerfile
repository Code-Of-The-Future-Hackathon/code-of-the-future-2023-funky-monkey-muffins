# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM node as base
WORKDIR /code

COPY package*.json ./
COPY prisma ./

# install dependencies
RUN npm install

COPY src/ ./
