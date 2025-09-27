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

// Metodo POST
const createUser = (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) return sendError(res, "Faltan campos obligatorios", 400);

  const newUser = { id: users.length + 1, name, role };
  users.push(newUser);

  return sendSuccess(res, newUser, "Usuario creado", 201);
};

// Metodo PUT

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role } = req.body;
  const index = users.findIndex(u => u.id === id);

  if (index === -1) return sendError(res, "Usuario no encontrado", 404);
  if (!name || !role) return sendError(res, "Faltan campos obligatorios", 400);

  users[index] = { id, name, role };
  return sendSuccess(res, users[index], "Usuario actualizado");
};

// Metodo PATCH
const patchUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role } = req.body;
  const user = users.find(u => u.id === id);

  if (!user) return sendError(res, "Usuario no encontrado", 404);

  if (name) user.name = name;
  if (role) user.role = role;

  return sendSuccess(res, user, "Usuario actualizado parcialmente");
};

// DELETE usuario
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) return sendError(res, "Usuario no encontrado", 404);

  users.splice(index, 1);
  return sendSuccess(res, null, "Usuario eliminado", 204);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser
}