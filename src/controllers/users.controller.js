const { sendSuccess, sendError } = require("../helpers/apiResponse");
const { users } = require("../database/db");

// GET: listar usuarios con filtro de búsqueda
const getUsers = (req, res) => {
  const { search } = req.query;
  let filtered = [...users];

  if (search) {
    filtered = filtered.filter(
      u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  return sendSuccess(res, filtered, "Usuarios obtenidos correctamente");
};

// GET: usuario por id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) return sendError(res, "Usuario no encontrado", 404);

  return sendSuccess(res, user, "Usuario encontrado");
};

// POST: crear usuario
const createUser = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return sendError(res, "Faltan campos obligatorios (name, email, password)", 400);
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // En un caso real se debería encriptar
    registered_at: new Date().toISOString().split("T")[0]
  };

  users.push(newUser);

  return sendSuccess(res, newUser, "Usuario creado", 201);
};

// PUT: actualizar usuario completo
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;
  const index = users.findIndex(u => u.id === id);

  if (index === -1) return sendError(res, "Usuario no encontrado", 404);
  if (!name || !email || !password) {
    return sendError(res, "Faltan campos obligatorios", 400);
  }

  users[index] = {
    id,
    name,
    email,
    password,
    registered_at: users[index].registered_at
  };

  return sendSuccess(res, users[index], "Usuario actualizado");
};

// PATCH: actualización parcial
const patchUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;
  const user = users.find(u => u.id === id);

  if (!user) return sendError(res, "Usuario no encontrado", 404);

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;

  return sendSuccess(res, user, "Usuario actualizado parcialmente");
};

// DELETE: eliminar usuario
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
};
