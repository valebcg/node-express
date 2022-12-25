// ---Importo el paquete express y se ejecuta para obtener un enrutado---
const express = require('express')
const app = express()

// ----Importo paquete promises para retornar promesas----
const fsPromises= require ('fs/promises')

// ---Intercambio de Recursos de Origen Cruzado---
const cors = require('cors')

// ---Puerto que se levatará----
app.listen(3000, console.log("¡Servidor encendido!"))

// --- pasando como argumento el middleware ----
app.use(cors())
app.use(express.json())

// -----Creando endpoint y ruta-----
app.get("/songs", async (req, res) => {
    const songs = JSON.parse(await fsPromises.readFile("repertorio.json", "utf8"))
    res.json(songs)
    });
    
    