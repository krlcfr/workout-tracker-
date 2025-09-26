// Respuesta exitosa
function sendSuccess(res, data, status = 200) {
  return res.status(status).json({
    success: true,
    code: status,
    data
  });
}

// Respuesta con error
function sendError(res, status = 500, message = "Error interno del servidor", code = "INTERNAL_ERROR") {
  return res.status(status).json({
    success: false,
    code,
    error: message
  });
}

module.exports = { sendSuccess, sendError };
