FROM node:18

RUN apt-get update && apt-get install -y \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY client/package.json client/package-lock.json /app/

RUN npm install

COPY client /app/

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]