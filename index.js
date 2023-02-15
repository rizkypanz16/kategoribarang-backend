const express = require('express');
const md5 = require('md5');
const app = express();
var bodyParser = require('body-parser');
const mysql = require('mysql');
const port = 3001;

// CREATE DATETIME NOW()
const now = new Date();
const datetime = now.toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

// body: x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// body: raw -> json
app.use(express.json({ extended: true }))

// IMPORT CONNECTION MODULE
const config = require('./connection.js');
const { urlencoded } = require('express');
var connection = config.connection;

// =========================================================================================================================================

// GET ALL USER DATA
app.get('/api/kategori', (req, res) => {
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
app.get('/api/kategori/:id', (req, res) => {
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
app.post('/api/kategori/', (req, res) => {
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
app.put('/api/kategori/:id', (req, res) => {
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
        // data: {
        // }
      }
    )
  }); 
});

//DELETE DATA
app.delete('/api/kategori/:id', (req, res) => {
  var reqID = req.params.id;
  var query = "DELETE FROM kategori_barang WHERE id_kategori='"+reqID+"'";
  connection.query(query, (error, results) => { 
    if (error) throw error;
    res.status(200);
    res.json(
      { 
          status: "SUCCESS",
          // data: []
      }
    )
  });
});

app.listen(port, () => {
  console.log("== SERVICE-AUTH ==");
  console.log(`server listening at http://localhost:${port}`);
});

