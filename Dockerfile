FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run gen
RUN npm run sync
RUN npm run build

# TODO 
# make size smaller

# FROM node:18-alpine

# WORKDIR /app
# COPY --from=0 /app/dist ./
# COPY --from=0 /app/package.json /app/package-lock.json ./

# RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node" , "dist/server/server.js"]