
FROM node:17-alpine3.14 as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.build.json .

RUN yarn 

COPY . .

RUN yarn build 


EXPOSE 3080

CMD ["node", "dist/main"]





