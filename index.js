const express = require('express');
const md5 = require('md5');
const app = express();
var bodyParser = require('body-parser');
const mysql = require('mysql');
const env = require('dotenv').config();
const port = 3001;
const cors = require("cors");

// CREATE MULTER TO UPLOAD FILE FROM FORM-DATA
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage });

// CREATE DATETIME NOW()
var date = new Date();
date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
// console.log(date);

// body: x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// body: raw -> json
app.use(express.json({ extended: true }));

app.use(cors());

// IMPORT CONNECTION MODULE
const config = require('./connection.js');
const { urlencoded } = require('express');

var connection = config.connection;

// =========================================================================================================================================

app.get('/', (req, res) => {
  res.json(
    {
      "status": true,
      "code": 200,
      "message": "SUCCESS",
      "api": "stokbarang api"
      }
  )
});

app.get('/api', (req, res) => {
  res.json(
    {
      "status": true,
      "code": 200,
      "message": "SUCCESS",
      "api": "stokbarang api"
      }
  )
});

// =========================================================================================================================================

app.get('/api/kategoribarang', (req, res) => {
  connection.query("SELECT id_kategori, kategori, deskripsi FROM kategori_barang", (error, results, fields) => { 
    if (error) throw error;
    res.status(200);
    res.json(
      { 
          status: "OK",
          data: results
      }
    )
  });
});

// GET USER DATA BY ID
app.get('/api/kategoribarang/:id', (req, res) => {
    connection.query("SELECT id_kategori, kategori, deskripsi FROM kategori_barang WHERE id_kategori = '"+req.params.id+"'", (error, results, fields) => { 
      if (error) throw error;
      res.status(200);
      res.json(
        { 
            status: "OK",
            data: results
        }
      )
    });
});

// POST DATA USER TYPE RAW JSON
app.post('/api/kategoribarang/', (req, res) => {
  // REQUEST JSON DATA
  var v_id_kategori = req.body.id_kategori;
  var v_kategori = req.body.kategori;
  var v_deskripsi = req.body.deskripsi;
  
  var query = "INSERT INTO kategori_barang (id_kategori, kategori, deskripsi) SELECT * FROM (SELECT '"+md5(v_id_kategori)+"', '"+v_kategori+"', '"+v_deskripsi+"') AS tmp WHERE NOT EXISTS (SELECT id_kategori FROM kategori_barang WHERE id_kategori = '"+md5(v_id_kategori)+"') LIMIT 1";
  connection.query(query, (error, results) => { 
    if (error) throw error;
    // CHECK RECORD IF DUPLICATES
    if(results.affectedRows == 1){
      res.status(200);
      res.json(
        { 
          status: "SUCCESS",
          data: []
          // data: {
          //   user_id: md5(v_userid),
          //   fullname: v_fullname,
          //   username: v_username,
          //   email: v_email,
          //   password: md5(v_password),
          //   phone: v_phone,
          //   created_at: datetime
          // }
        }
      );
    }else{
      res.status(409).send(
        { 
          status: "Duplicate record found",
          data: []
        });
    }
  }); 
});

// PUT / UPDATE DATA 
app.put('/api/kategoribarang/:id', (req, res) => {
  var reqID = req.params.id;
  // REQUEST JSON DATA
  var v_id_kategori = req.body.id_kategori;
  var v_kategori = req.body.kategori;
  var v_deskripsi = req.body.deskripsi;
  
  var query = "UPDATE kategori_barang SET kategori='"+v_kategori+"', deskripsi='"+v_deskripsi+"' WHERE id_kategori='"+reqID+"'";
  connection.query(query, (error, results) => { 
    if (error) throw error;
    res.status(200);
    res.json(
      { 
        status: "SUCCESS",
        data: []
        // data: {
        // }
      }
    )
  }); 
});

//DELETE DATA
app.delete('/api/kategoribarang/:id', (req, res) => {
  var reqID = req.params.id;
  var query = "DELETE FROM kategori_barang WHERE id_kategori='"+reqID+"'";
  connection.query(query, (error, results) => { 
    if (error) throw error;
    res.status(200);
    res.json(
      { 
          status: "SUCCESS",
          data: []
      }
    )
  });
});

// ===========================================================================================================================

app.get("/api/barang", (req, res) => {
  connection.query(
    "SELECT * FROM data_barang JOIN kategori_barang ON data_barang.id_kategori = kategori_barang.id_kategori",
    function (error, results, fields) {
      // console.log(error)
      res.send(results);
    }
  );
});

app.get("/api/barang/:id_barang", (req, res) => {
  connection.query(
    "SELECT * FROM data_barang WHERE id_barang='"+req.params.id_barang+"'",
    function (error, results, fields) {
      // console.log(error)
      res.send(results);
    }
  );
});

app.post("/api/barang", upload.single('foto_barang'), (req, res) => {
  let dataInputan = {
    id_barang: md5(req.body.id_barang),
    id_kategori: req.body.id_kategori,
    nama_barang: req.body.nama_barang,
    foto_barang: req.file.originalname,
    deskripsi: req.body.deskripsi,
    jumlah_barang: req.body.jumlah_barang,
    harga_barang: req.body.harga_barang,
    created_at: date,
    updated_at: req.body.updated_at,
  };
  
  connection.query(
    "INSERT INTO data_barang SET ?",
    dataInputan,
    (error, results, fields) => {
      // console.log(error);
      // res.send(results);
      res.json(
        { 
            status: "OK",
            data: []
        }
      )
    }
  );
});

app.delete("/api/barang/:id_barang", (req, res) => {
  connection.query(
    `DELETE FROM data_barang WHERE id_barang = '${req.params.id_barang}'`,
    (error, results) => {
      // console.log(error);
      // res.send(results);
      res.json(
        { 
            status: "OK",
            data: []
        }
      )
    }
  );
});

app.put("/api/barang/:id_barang", (req, res) => {
    let id_barang = req.body.id_barang;
    let id_kategori = req.body.id_kategori;
    let nama_barang = req.body.nama_barang;
    let foto_barang = req.body.foto_barang;
    let deskripsi = req.body.deskripsi;
    let jumlah_barang = req.body.jumlah_barang;
    let harga_barang = req.body.harga_barang;
    let created_at= req.body.created_at;
    let updated_at= req.body.updated_at;

  connection.query(
    'UPDATE data_barang SET id_barang =? , id_kategori=? , nama_barang =? , foto_barang =?, deskripsi =? , jumlah_barang =? , harga_barang =?, created_at=?,  updated_at=? WHERE id_barang =?',[id_barang,id_kategori,nama_barang,foto_barang,deskripsi,jumlah_barang,harga_barang,created_at,updated_at,id_barang],
    (error, results) => {
      // console.log(error);
      // res.send(results);
      res.json(
        { 
            status: "OK",
            data: []
        }
      )
    }
  );
});

// =========================================================================================================================================

app.get('/api/historibarang', (req, res) => {
  connection.query("SELECT * FROM histori_barang JOIN data_barang ON histori_barang.id_barang = data_barang.id_barang", (error, results, fields) => { 
    if (error) throw error;
    res.status(200);
    res.json(
      { 
          status: "OK",
          data: results
      }
    )
  });
});

app.post("/api/historibarang", (req, res) => {
  const v_id_transaksi = req.body.v_id_transaksi;
  const idBarang = req.body.id_barang;
  const typeHistori = req.body.v_type;
  const v_date = req.body.v_date;
  const v_nama = req.body.v_nama;
  const v_kuantitas = req.body.v_kuantitas;

  if (typeHistori === "KELUAR") {
    connection.query(
      `INSERT INTO histori_barang (id_transaksi, id_barang, type, date, nama, kuantitas) VALUES ('${v_id_transaksi}', '${idBarang}', '${typeHistori}', '${v_date}', '${v_nama}', '${v_kuantitas}');`,
      (error, results, fields) => {
        if (error) throw error;
        connection.query(
          `UPDATE data_barang SET jumlah_barang = jumlah_barang - ${v_kuantitas} WHERE id_barang = '${idBarang}'`,
          (error, results, fields) => {
            if (error) throw error;
            res.send({ status : "OK" });
          }
        );
      }
    );
  } else if (typeHistori === "MASUK") {
    connection.query(
      `INSERT INTO histori_barang (id_transaksi, id_barang, type, date, nama, kuantitas) VALUES ('${v_id_transaksi}', '${idBarang}', '${typeHistori}', '${v_date}', '${v_nama}', '${v_kuantitas}');`,
      (error, results, fields) => {
        if (error) throw error;
        connection.query(
          `UPDATE data_barang SET jumlah_barang = jumlah_barang + ${v_kuantitas} WHERE id_barang = '${idBarang}'`,
          (error, results, fields) => {
            if (error) throw error;
            res.send({ status : "OK" });
          }
        );
      }
    );
  } else {
    res.status(400).send("Type Histori tidak valid!");
  }
});

app.get('/api/historibarang/:id', (req, res) => {
  connection.query("select histori_barang.id_transaksi, data_barang.nama_barang, data_barang.foto_barang, histori_barang.type, histori_barang.date, histori_barang.nama, histori_barang.kuantitas from data_barang right join histori_barang on histori_barang.id_barang = data_barang.id_barang WHERE data_barang.id_barang = '"+req.params.id+"'", (error, results, fields) => { 
    if (error) throw error;
    res.status(200);
    res.json(
      { 
          status: "OK",
          data: results
      }
    )
  });
});

// =========================================================================================================================================

app.listen(port, () => {
  console.log("== SERVICE-AUTH ==");
  console.log(`server listening at http://localhost:${port}`);
});

