const ERRORS = require("../errors/errors")


const validateFields = ({ name, image, summary, healthScore, steps, diets }) => {
  const errs = []
  if (!name) errs.push('The field "name" is mandatory')
  if (!image) errs.push('The field "image" is mandatory')
  if (!summary) errs.push('The field "summary" is mandatory')
  if (!healthScore) errs.push('The field "healthScore" is mandatory')
  if (!steps) errs.push('The field "steps" is mandatory')
  if (!diets) errs.push('The field "diets" is mandatory')
  if (!isString(name)) errs.push('The field "name" should be a string')
  if (!isString(image)) errs.push('The field "image" should be a string')
  if (!isString(summary)) errs.push('The field "summary" should be a string')
  if (isNaN(healthScore)) errs.push('The field "healthScore" should be a number')
  if (!Array.isArray(steps)) errs.push('The field "steps" should be an array')
  if (!Array.isArray(diets)) errs.push('The field "diets" should be an array')

  if (errs.length === 0) return

  if (errs.length === 1) throw ERRORS.badRequest(errs[0])
  throw ERRORS.badRequest(errs.join("\n"))
}

const isString = (str) => {
  return typeof str === "string"
}



module.exports = {
  validateFields
}
