const ERRORS = require("../errors/errors")


const validateFields = ({ name, image, summary, healthScore, steps, diets }) => {
  const errs = []
  if (!name) errs.push('The field name is mandatory')
  else if (!isString(name)) errs.push('The field name should be a string')

  if (!image) errs.push('The field image is mandatory')
  else if (!isString(image)) errs.push('The field image should be a string')

  if (!summary) errs.push('The field summary is mandatory')
  else if (!isString(summary)) errs.push('The field summary should be a string')

  if (!healthScore) errs.push('The field healthScore is mandatory')
  else if (isNaN(healthScore)) errs.push('The field healthScore should be a number')

  if (!steps) errs.push('The field steps is mandatory')
  else if (!Array.isArray(steps)) errs.push('The field steps should be an array')

  if (!diets) errs.push('The field diets is mandatory')
  else if (!Array.isArray(diets)) errs.push('The field diets should be an array')

  if (errs.length === 0) return

  if (errs.length === 1) throw ERRORS.badRequest(errs[0])
  throw ERRORS.badRequest(errs.join(", "))
}

const isString = (str) => {
  return typeof str === "string"
}



module.exports = {
  validateFields
}
