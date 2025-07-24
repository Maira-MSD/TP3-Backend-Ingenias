const express = require("express");
const router = express.Router();
const { Contenido, Actores } = require("../../models/trailerflix");

router.get("/", async (req, res) => {
  try {
    const jobs = await Contenido.findAll({
      attributes: ["contenido_id"],
      include: [
        {
          model: Actores,
          attributes: ['nombre_completo'],
          through: { attributes: [] },
          where: { nombre_completo: "Chris Pratt" }
        }
      ],
      
    });
    //console.log(jobs);

    if (jobs.length === 0) {
      return res.status(404).json({ error: "No se encontraron trabajos de Chris Pratt" });
    } else {
        return res.json({ message: `Cantidad de trabajos de Chris Pratt: ${jobs.length}` });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener cantidad de trabajos de Chris Pratt" });
  }
});

module.exports = router;