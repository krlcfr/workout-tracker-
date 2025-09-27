// Simulación de una base de datos en memoria

// Usuarios
let users = [
  {
    id: 1,
    name: "Santiago",
    email: "elsanti@correo.com",
    password: "123456", // clave solo para demo o pruebas
    registered_at: "2025-09-13"
  }
];

// Ejercicios
let exercises = [
  {
    id: 101,
    name: "Press de banca",
    description: "Ejercicio de fuerza para el pecho",
    category: "fuerza",
    muscle_group: "pecho"
  }
];

// Planes
let plans = [
  {
    id: 201,
    user_id: 1,
    exercises: [{ exercise_id: 101, sets: 4, reps: 12, weight: 40 }],
    notes: "Plan inicial de fuerza"
  }
];

// Entrenamientos programados
let schedules = [
  {
    id: 301,
    plan_id: 201,
    scheduled_date: "2025-09-20",
    scheduled_time: "07:30",
    status: "pendiente"
  }
];

// Reportes de progreso
let reports = [
  {
    id: 401,
    user_id: 1,
    generated_at: "2025-09-25",
    completed_workouts: 15,
    total_hours: 22,
    notes: "El usuario ha incrementado fuerza en pecho y piernas"
  }
];

module.exports = { users, exercises, plans, schedules, reports };
