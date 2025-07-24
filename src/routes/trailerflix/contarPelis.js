const express = require("express");
const router = express.Router();
const { Contenido, Categoria } = require("../../models/trailerflix");
const { Op } = require("sequelize");

//endpoint contar peliculas

const { where } = require("sequelize");

router.get('/peliculas/total', async (req, res) => {
  try {
    const totalPeliculas = await Contenido.count({
      where:{
        categoria_id: 1,
      }
    });
    res.json(`Total de películas registradas: ${totalPeliculas}`);
    console.log(`Total de películas registradas: ${totalPeliculas}`);
    
  } catch (error) {
    res.status(500).json({ error: 'Error al contar las películas' });
  }
});

module.exports = router;