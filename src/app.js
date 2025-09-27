const express = require("express");
const { port } = require("./config/env");
const routes = require("./routes");


const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar rutas centralizadas
app.use("/api", routes);

// Ruta base
app.get("/", (req, res) => {
  res.send("Workout Tracker API running...");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


module.exports = app;

