const express = require("express");
const router = express.Router();
const { Contenido, Categoria } = require("../../models/trailerflix");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const resultados = await Contenido.findAll({
      attributes: ["titulo"],
      include: [
        {
          model: Categoria,
          attributes: ["nombre"]
        }
      ],
      where: { resumen: { [Op.like]: "%misión%" } }
    });
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

module.exports = router;