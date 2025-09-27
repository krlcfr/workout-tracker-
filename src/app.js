const express = require("express");
const { port } = require("./config/env"); // Puerto desde variables de entorno
const routes = require("./routes"); // Importamos el index de routes

const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales (se delega al index de routes)
app.use("/v1", routes);

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("Workout Tracker API corriendo 🚀");
});

// Inicialización del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
