const {Diet} = require('../db')

const getDiets=async()=>{
    const diets = await Diet.findAll()
        return diets
   
   
}

module.exports = getDiets;