const { Router } = require('express');
const getRecipe = require('../controllers/getRecipeById');
const getRecipeByName = require('../controllers/getRecipeByName');
const getDiets = require('../controllers/getDiets');
const start = require('../controllers/start')
const addRecipe = require('../controllers/addRecipe')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


//Recibe un id por params, responde con
// la receta que matchea con el id recibido 
router.get('/recipes/:idRecipe',async (req,res)=>{
    const {idRecipe} = req.params
    try {
        const recipe = await getRecipe(idRecipe)
        return res.status(200).json(recipe)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
//Recibe un nombre por query y responde con todas las recetas
//con un nombre parecido al requerido
router.get('/recipes', async(req,res)=>{
    const {name} = req.query
    try {
        const recipes = await getRecipeByName(name)
        return res.status(200).json(recipes)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
//Responde con todos las dietas registradas en la db
router.get('/diets', async(req,res)=>{
    try {
        const diets = await getDiets();
        return res.status(200).json(diets)
    } catch (error) {
        return res.json(error.message)
    }
})
//trae las 100 recetas 
router.get('/start',async(req,res)=>{
    try {
        const allrecipes = await start();
        return res.status(200).json(allrecipes)
    } catch (error) {
        return res.status(400).json(error.message)
        
    }
})
//Agrega un receta con los datos recibidos por body en la request 
router.post('/recipes',async(req,res)=>{
    const {name,image,summary,healthScore,steps,diets} = req.body;
    try {
        const  creada = await addRecipe(name,image,summary,healthScore,steps,diets)
        return res.status(200).json(creada)
    } catch (error) {
        return res.json({error:error.message})
    }
})



module.exports = router;
