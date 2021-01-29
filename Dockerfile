FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:14 AS runner
WORKDIR /app
COPY --from=builder app/dist ./dist
COPY package*.json ./
RUN yarn install --production
# COPY .env ./
CMD ["yarn", "start"]