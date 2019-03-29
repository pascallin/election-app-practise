FROM keymetrics/pm2:10-stretch
COPY ./src /app
COPY ./package.json /app
COPY ./config /app/config
WORKDIR /app
RUN npm install > /dev/null
EXPOSE 3000
ARG NODE_ENV
ENV TZ Asia/Shanghai
CMD ["pm2", "start", "index.js"]