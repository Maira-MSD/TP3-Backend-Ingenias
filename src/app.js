const express = require("express");
require("dotenv").config({ path: __dirname + '/../.env' });
const routes = require("./routes/index");

const app = express();
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("servidor corriendo en el puerto 3000")
});





