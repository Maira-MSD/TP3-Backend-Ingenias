//Definir todas las rutas

const express = require("express");

//metodo router de express
const router = express.Router();

//controladores de las funciones
const getAll = require("./trailerflix/getAll");
const getGenero = require("./trailerflix/getGenero")
const getResumenMisionRoute = require("./trailerflix/getResumenMision");
<<<<<<< HEAD
const getPeliculas = require("./trailerflix/getPeliculas");
const getSeries = require("./trailerflix/getSeries");
const getChrisPrattJobs = require("./trailerflix/getChrisPrattJobs");
=======
const contarPelis = require("./trailerflix/contarPelis")
>>>>>>> eebf13e (agrego endpoint de punto 10)

//endpoints
router.get("/trailerflix", getAll);
router.use("/contenido", getGenero);
router.use("/resumen-mision", getResumenMisionRoute);
<<<<<<< HEAD
router.use("/peliculas", getPeliculas);
router.use("/series", getSeries);
router.use("/chris-pratt-jobs", getChrisPrattJobs);
=======
router.use("/", contarPelis);
>>>>>>> eebf13e (agrego endpoint de punto 10)

module.exports = router;