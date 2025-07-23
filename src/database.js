//definir constante para poder usar sequelize
const {Sequelize} = require("sequelize");  

//accesso a bbdd a traves de datos del dotenv
require("dotenv").config();

//configurar sequelize
const sequelize = new Sequelize (
    process.env.DB_NAME,        
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        define: {timestamps: false}
    }
);

//conexion a bbdd

async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida correctamente");
        } catch (error) {
            console.error("Error de conexión", error);
        }
};

//invocar la funcion

authenticate();

//exportar la funcion de conexion 

module.exports = sequelize;

