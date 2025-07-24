const express = require("express");
const router = express.Router();
const { Contenido, Categoria } = require("../../models/trailerflix");
const { Op } = require("sequelize");

//endpoint contar series

const { where } = require("sequelize");

router.get('/series/total', async (req, res) => {
  try {
    const totalSeries = await Contenido.count({
      where:{
        categoria_id: 2,
      }
    });
    res.json(`Total de series registradas: ${totalSeries}`);
    console.log(`Total de series registradas: ${totalSeries}`);
    
  } catch (error) {
    res.status(500).json({ error: 'Error al contar las series' });
  }
});

module.exports = router;