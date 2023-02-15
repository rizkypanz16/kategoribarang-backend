FROM node:latest
WORKDIR /kategori-barang-backend

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3001
CMD ["node", "index.js"]