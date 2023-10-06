const { Router } = require('express')
const Recipes = require('../controllers/recipes')
const Diets = require('../controllers/diets')
const Start = require('../controllers/start')

const router = Router()

router.get('/recipes/:idRecipe', Recipes.getRecipe)

router.get('/recipes', Recipes.getRecipes)

router.post('/recipes', Recipes.saveRecipe)

router.get('/diets', Diets.getDiets)

router.get('/start', Start.getRecipesAndDiets)

module.exports = router
