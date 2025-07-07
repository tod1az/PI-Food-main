
class AppError extends Error {

  constructor(message, statusCode, type) {
    super(message)
    this.status = statusCode || 500
    this.name = "AppError"
    this.type = type || "INTERNAL SERVER ERROR"
  }
}

module.exports = AppError

