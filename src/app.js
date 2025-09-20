const express = require("express"); // Import express
const app = express(); // Create an instance of express
//const port = 8000; // puerto de escucha
const { port } = require('./config/env'); // Import the port from the env file
const usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");
const plansRouter = require("./routes/plans");
const schedulesRouter = require("./routes/schedules");
const reportsRouter = require("./routes/reports");

app.use("/v1/users", usersRouter);
app.use("/v1/exercises", exercisesRouter);
app.use("/v1/plans", plansRouter);
app.use("/v1/schedules", schedulesRouter);
app.use("/v1/reports", reportsRouter);

// Inicializacion del servidor y primera ruta
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.use(express.json()); // Permite trabajar con JSON en req.body

