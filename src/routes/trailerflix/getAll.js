//importar el modelo de la base de datos trailerflix
const trailerflix = require("../../models/trailerflix");

//metodo get para buscar todo el contenido

module.exports = async(req , res) => {
    try{
        const contenido = await contenido.findAll();
        res.json(contenido);
    } catch(error){
        res.status(500).json({ error: "Error de busqueda"});

    }
};

module.exports