
const AppError = require("../errors/AppError.js")

const ERRORS = {
  notFound: (msg = "NOT FOUND") => new AppError(msg, 404, "NOT FOUND")
  ,
  badRequest: (msg = "BAD REQUEST") => new AppError(msg, 400, "BAD REQUEST")
  ,
  serverError: (msg = "INTERNAL ERROR") => new AppError(msg, 500, "INTERNAL ERROR")
}

module.exports = ERRORS
