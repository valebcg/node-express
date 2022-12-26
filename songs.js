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
    
 // -----agregando un nuevo elemento al Array----
 app.post("/songs", async (req, res) => {
    try {
      const song = req.body;
      if (song.titulo === "") {
        return;
     
      }
  
      if (song.artista === "") {
        return;
      }
  
      if (song.tono === "") {
        return;
          }
      const songs = JSON.parse(
        await fsPromises.readFile("repertorio.json", "utf-8")
      );
      songs.push(song);
      await fsPromises.writeFile("repertorio.json", JSON.stringify(songs));
      res.send("Canción agregada con éxito!");
    } catch{
      res.send({ status: "error", data: "error interno del servidor" });
    }
  });
        

  // -----eliminando el id----
app.delete("/songs/:id", async(req, res) => {
    const { id } = req.params
    const songs = JSON.parse(await fsPromises.readFile("repertorio.json","utf8"))
    const index = songs.findIndex(p => p.id == id) 
    songs.splice(index, 1)
    await fsPromises.writeFile("repertorio.json", JSON.stringify(songs)) 
    res.send("Canción eliminada con éxito")
    })


    //  ----modificando el id------
    app.put("/songs/:id", async(req, res) => {
        try {
        const { id } = req.params
        const song = req.body
        if (song.titulo === "") {
            return;
         
          }
      
          if (song.artista === "") {
            return;
          }
      
          if (song.tono === "") {
            return;
              }
        const songs = JSON.parse(await fsPromises.readFile("repertorio.json","utf8"))
        const index = songs.findIndex(p => p.id == id) 
        songs[index] = song
        await fsPromises.writeFile("repertorio.json", JSON.stringify(songs)) 
        res.send("Canción modificado con éxito");
        }catch{
            res.send({ status: "error", data: "error interno del servidor" });
          }
    })


    // ----index.html----
    app.get("/",(req, res) =>{
        res.sendFile(__dirname + "/index.html")
    })