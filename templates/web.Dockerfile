FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run gen
RUN npm run sync
RUN npm run build


FROM node:18-alpine

WORKDIR /app
COPY --from=0 /app/dist ./dist
COPY --from=0 /app/package.json /app/package-lock.json ./

RUN npm ci --omit=dev

EXPOSE __PROD_PORT__

CMD ["npm" , "run", "serve"]