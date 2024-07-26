const express = require("express");
const app = express();
const fs = require("fs").promises;
const port = process.env.PORT || 3001;
const protocol = process.env.PROTOCOL || 'http';
const host = process.env.HOST || '127.0.0.1';

const miServidor =  `${protocol}://${host}:${port}`;

app.listen(port,() => {
    console.info(`servidor corriendo en ${miServidor}`);
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/crear", async (req,res) => {
    const { archivo, contenido } = req.query;
try {
    fs.writeFile(archivo, contenido);
    res.send('archivo creado :)');
  } catch (error) {
 	res.status(500).send("Algo salió mal, vuelva a intentar ......");
  }
});

app.get("/leer", async (req, res) => {
    const { archivo } = req.query;
    try {
      const name = await fs.readFile(archivo);
      res.send(name);
    } catch (error) {
      res.status(500).send("Algo salió mal, vuelva a intentar ......");
    }
  });

app.get("/renombrar", async (req, res) => {
    const { nombre, nuevoNombre } = req.query;
 try {
    fs.rename(nombre, nuevoNombre);
        res.send(`archivo ${nombre} es renombrado por ${nuevoNombre}`);
  } catch (error) {
      res.status(500).send("Algo salió mal, vuelva a intentar ......");
    } 
});

app.get("/eliminar", async  (req, res) => {
    const { archivo } = req.query;
  try {
    fs.unlink(archivo);
      res.send(`Archivo ${archivo} eliminado con éxito`);
  } catch (error) {
      res.status(500).send("Algo salió mal, vuelva a intentar ...");
  }
});