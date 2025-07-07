const { Router } = require('express')
const Recipes = require('../controllers/recipes')
const Diets = require('../controllers/diets')

const router = Router()

router.get('/recipes/:idRecipe', Recipes.getRecipe)

router.get('/recipes', Recipes.getRecipes)

router.post('/recipes', Recipes.saveRecipe)

router.get('/diets', Diets.getDiets)

router.get('/diets/generate', Diets.generateDiets)

module.exports = router
