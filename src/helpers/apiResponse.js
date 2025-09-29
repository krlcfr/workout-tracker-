function sendSuccess(res, data, message = "Operación exitosa", status = 200) {
  return res.status(status).json({
    success: true,
    code: status,
    message,
    data
  });
}

function sendError(res, message = "Error interno del servidor", status = 500, code = "INTERNAL_ERROR") {
  return res.status(status).json({
    success: false,
    code,
    message
  });
}

module.exports = { sendSuccess, sendError };
