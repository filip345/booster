FROM node:14.16-alpine

ENV NODE_ENV production
WORKDIR /home/node

COPY ./ /home/node/
RUN ls -la
RUN sed -i 's/\^//g' /home/node/package.json
RUN npm install

CMD ["node", "main.js"]

EXPOSE 3333