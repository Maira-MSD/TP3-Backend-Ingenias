const express = require("express");
const router = express.Router();
const { Contenido, Genero } = require("../../models/trailerflix"); 

// GET /contenido/genero/:nombre
router.get("/genero/:nombre", async (req, res) => {
    console.log("REQ.PARAMS:", req.params)
    const generoNombre = req.params.nombre;

    try {
        const contenido = await Contenido.findAll({
            include: {
                model: Genero,
                where: { nombre: generoNombre },
                attributes: [] 
            },
            attributes: ["titulo"]
        });

        if (contenido.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron contenidos para ese género." });
        }

        res.json(contenido);
    } catch (error) {
        console.error("Error al buscar contenido por género:", error);
        res.status(500).json({ error: "Error del servidor." });
    }
});

module.exports = router;