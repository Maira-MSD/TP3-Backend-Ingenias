//Definir todas las rutas

const express = require("express");

//metodo router de express
const router = express.Router();

//controladores de las funciones
const getAll = require("./trailerflix/getAll");
const getGenero = require("./trailerflix/getGenero")
const getResumenMisionRoute = require("./trailerflix/getResumenMision");
const getPeliculas = require("./trailerflix/getPeliculas");
const getSeries = require("./trailerflix/getSeries");

//endpoints
router.get("/trailerflix", getAll);
router.use("/contenido", getGenero)
router.use("/resumen-mision", getResumenMisionRoute);
router.use("/peliculas", getPeliculas);
router.use("/series", getSeries);

module.exports = router;