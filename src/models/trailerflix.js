//definir tipo de dato
const {DataTypes} = require("sequelize");
const Sequelize = require("../database");
const sequelize = require("../database");

//registro de tabla Categoria

const Categoria = sequelize.define("Categoria", {
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: "Categoria",
    timestamps: false
});

//registro de tabla Genero

const Genero = sequelize.define("Genero", {
    genero_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: "Genero",
    timestamps: false
});

const Contenido = sequelize.define("Contenido", {
    contenido_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    titulo:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    resumen:{
        type: DataTypes.STRING(1000),
        defaultValue: null,
            },
    temporadas:{
        type: DataTypes.STRING(50),
        defaultValue: null,
    },
    duracion_min:{
        type:  DataTypes.STRING(50),
        defaultValue: null,
    },
    poster:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    trailer:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    categoria_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Categoria",
            key: "categoria_id"
        },
    },
    genero_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Genero",
            key: "genero_id"
        },
    }
},
{
    tableName: "Contenido",
    timestamps:false,
}
);
 
Contenido.belongsTo(Categoria, {
    foreignKey: "categoria_id"
});
Categoria.hasMany(Contenido, {
    foreignKey: "categoria_id"
});

Contenido.belongsTo(Genero, {
    foreignKey: "genero_id"
});
Genero.hasMany(Contenido, {
    foreignKey: "genero_id"
});
  
//exportar los modelos de tabla de contenido, categoria, genero
module.exports = { Contenido, Categoria, Genero };

