//Definir todas las rutas
const express = require("express");
const router = express.Router();

// controladores ya existentes
const getAll = require("./trailerflix/getAll");
const getGenero = require("./trailerflix/getGenero");
const getResumenMisionRoute = require("./trailerflix/getResumenMision");
const getPeliculas = require("./trailerflix/getPeliculas");
const getSeries = require("./trailerflix/getSeries");
const getChrisPrattJobs = require("./trailerflix/getChrisPrattJobs");
const contarPelis = require("./trailerflix/contarPelis");
const contarSeries = require("./trailerflix/contarSeries");

// yesi
const tagsRouter = require("./trailerflix/tags");
const temporada = require("./trailerflix/temporada");
const actores = require("./trailerflix/actores");
const actoresCant = require("./trailerflix/actores_cant");
const seriesOrden = require("./trailerflix/series_orden");
const fechaLanzamiento = require("./trailerflix/fecha_lanzamiento");
const buscar = require('./trailerflix/buscar');
const rankingRouter = require('./trailerflix/ranking');

// endpoints
router.get("/trailerflix", getAll);
router.use("/contenido", getGenero);
router.use("/resumen-mision", getResumenMisionRoute);
router.use("/peliculas", getPeliculas);
router.use("/series", getSeries);
router.use("/chris-pratt-jobs", getChrisPrattJobs);
router.use("/", contarPelis);
router.use("/", contarSeries);

// yesi
router.use("/", tagsRouter);  
router.use("/", temporada);
router.use("/", actores);
router.use("/", actoresCant);
router.use("/", seriesOrden);
router.use("/", fechaLanzamiento);
router.use('/', buscar);
router.use('/', rankingRouter);

module.exports = router;
