const {Diet} = require('../db')

const getDiets=async()=>{
    const diets = await Diet.findAll()
    if(diets.length===0)throw Error('No diets registered')    
    return diets
}

module.exports = getDiets;