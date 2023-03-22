## How to install node_modules dependency

`npm install`

## How to build docker image

`docker build -t stokbarang-backend:latest .`

## How to run stokbarang-backend on docker

`docker run -itd --name stokbarang-backend -p 3001:3001 stokbarang-backend:latest`

## Variable Environment

```
DBHOST=13.229.43.83
DBUSER=kelompok3
DBPASSWORD=k3l0mp0k3
DBNAME=gudang`
```

## List API URL

- `http://localhost:3001/`
- `http://localhost:3001/api/`
- `http://localhost:3001/api/barang/`
- `http://localhost:3001/kategoribarang/`
- `http://localhost:3001/historibarang/`
