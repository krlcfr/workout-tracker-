// Respuesta exitosa
const sendSuccess = (res, data, message = "Operación exitosa", status = 200) => {
  res.status(status).json({
    success: true,
    message,
    data,
  });
};

// Respuesta de error
const sendError = (res, message = "Error interno del servidor", status = 500) => {
  res.status(status).json({
    success: false,
    error: message,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};