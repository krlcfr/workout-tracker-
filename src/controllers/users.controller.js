const { sendSuccess, sendError } = require("../helpers/apiResponse");

// Simulación en memoria
let users = [
  { id: 1, name: "Santiago", role: "admin" },
  { id: 2, name: "Estefa", role: "user" }
];

// GET todos los usuarios (con filtros opcionales)
const getUsers = (req, res) => {
  const { role, search } = req.query;
  let filtered = [...users];

  if (role) filtered = filtered.filter(u => u.role === role);
  if (search) filtered = filtered.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return sendSuccess(res, filtered, "Usuarios obtenidos correctamente");
};

// GET usuario por id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) return sendError(res, "Usuario no encontrado", 404);

  return sendSuccess(res, user, "Usuario encontrado");
};

// POST crear usuario
const createUser = (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) return sendError(res, "Faltan campos obligatorios", 400);

  const newUser = { id: users.length + 1, name, role };
  users.push(newUser);

  return sendSuccess(res, newUser, "Usuario creado", 201);
};

module.exports = {
  getUsers,
  getUserById,
  createUser
}