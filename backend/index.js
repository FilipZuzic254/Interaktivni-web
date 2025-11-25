const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "student.veleri.hr",
    user: "riwa",
    password: "11",
    port: 3306,
    database: "riwa",
  });
  
app.use(express.urlencoded({ extended: true }));
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });



app.get("/api/knjige", (req, res) => {
  connection.query("SELECT * FROM knjiga", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/slobodne_knjige", (req, res) => {
  connection.query("SELECT * FROM knjiga WHERE `status` = 'slobodna'", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/api/knjiga", (req, res) => {
  const { naziv, autor } = req.query;

  console.log(naziv);
  console.log(autor);
  if (naziv != null) {
    const sqlQuery = "SELECT * FROM knjiga WHERE naslov = ?";

    connection.query(sqlQuery, [naziv], (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  } else if (autor != null) { 
    const sqlQuery = "SELECT * FROM knjiga WHERE autor = ?";

    connection.query(sqlQuery, [autor], (error, results) => {
      if (error) throw error;
      res.send(results);
    })
  }

});

app.get("/api/korisnici", (req, res) => {
  connection.query("SELECT * FROM korisnik", (error, results) => {
    if (error) throw error;
    res.send(results);
  })
})

app.get("/api/korisnik", (req, res) => {
  const { mail } = req.query;
  
  if (mail != null) {
    connection.query("SELECT * FROM korisnik WHERE mail = ?", [mail], (error, results) => {
      if (error) throw error;
      res.send(results);
    })
  }
  
})

app.get("/api/rezervacije", (req, res) => {
  connection.query("SELECT knjiga.id AS id_knjige, naslov, autor, korisnik.id AS id_korisnika, ime, prezime, datum_rezervacije, datum_vracanja FROM knjiga INNER JOIN rezervacija ON knjiga.id=rezervacija.`knjiga` INNER JOIN korisnik ON rezervacija.`korisnik`=korisnik.id;", (error, results) => {
    if (error) throw error;
    res.send(results);
  })
})

app.get("/api/nedovrsene_rezervacije", (req, res) => {
  connection.query("SELECT knjiga.id AS id_knjige, naslov, autor, korisnik.id AS id_korisnika, ime, prezime, datum_rezervacije, datum_vracanja FROM knjiga INNER JOIN rezervacija ON knjiga.id=rezervacija.`knjiga` INNER JOIN korisnik ON rezervacija.`korisnik`=korisnik.id WHERE datum_vracanja IS NULL OR datum_vracanja > CURRENT_DATE();", (error, results) => {
    if (error) throw error;
    res.send(results);
  })
})

app.get("/api/nedovrsene_rezervacije/korisnik", (req, res) => {
  connection.query("SELECT korisnik.id, ime, prezime, brtel, korime, lozinka, mail, zadnji_pristup, uloga FROM rezervacija INNER JOIN korisnik ON rezervacija.`korisnik`=korisnik.id WHERE datum_vracanja IS NULL OR datum_vracanja > CURRENT_DATE() GROUP BY korisnik.id;", (error, results) => {
    if (error) throw error;
    res.send(results);
  })
})



app.post("/api/rezerv_knjige", (req, res) => {
  const data = req.body;
  rezervacija = [[data.datum_rez, data.id_knjiga, data.id_korisnik]]
  connection.query("INSERT INTO rezervacija (datum_rezervacije, knjiga, korisnik) VALUES ?", [rezervacija], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(port, () => {
    console.log("Server running at port: " + port);
});