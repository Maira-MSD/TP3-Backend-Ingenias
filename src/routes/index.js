//Definir todas las rutas

const express = require("express");

//metodo router de express
const router = express.Router();

//controladores de las funciones
const getAll = require("./trailerflix/getAll");
const getGenero = require("./trailerflix/getGenero")
const getResumenMisionRoute = require("./trailerflix/getResumenMision");

//endpoints
router.get("/trailerflix", getAll);
router.use("/contenido", getGenero)
router.use("/resumen-mision", getResumenMisionRoute);

module.exports = router;


