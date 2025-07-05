require('dotenv').config()
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
const { DB_USER, DB_PASSWORD } = process.env
const sequelize = new Sequelize(`postgresql://${DB_USER}:${DB_PASSWORD}@ep-rapid-boat-acp7ad54-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed
})
const basename = path.basename(__filename)

const modelDefiners = []

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

modelDefiners.forEach((model) => model(sequelize))
const entries = Object.entries(sequelize.models)
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
sequelize.models = Object.fromEntries(capsEntries)

const { Recipe, Diet } = sequelize.models

// Aca vendrian las relaciones
Recipe.belongsToMany(Diet, { through: 'Recipe_diet' })
Diet.belongsToMany(Recipe, { through: 'Recipe_diet' })
// Product.hasMany(Reviews);

module.exports = {
  Recipe,
  Diet,
  conn: sequelize
}
