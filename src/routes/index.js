//Definir todas las rutas

const express = require("express");

//metodo router de express
const router = express.Router();

//controladores de las funciones
const getAll = require("./trailerflix/getAll");
const getGenero = require("./trailerflix/getGenero")
//endpoints
router.get("/trailerflix", getAll);
router.use("/contenido", getGenero)

module.exports = router;


