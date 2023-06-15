
//Limpia los datos del paso a paso de una receta
const stepsCleaner=(analyzedInstructions)=>{
    if(analyzedInstructions.length===0)return[]
    const {steps} = analyzedInstructions[0]
        let cleanedSteps =[]
        steps.map((step)=>{
            cleanedSteps.push(step.step)
        })
    return cleanedSteps;
}
//Limpia los datos de una receta
const recipeCleaner =(recipe)=>{
    const{id,title,image ,summary,healthScore,analyzedInstructions,diets,vegetarian} = recipe
    const steps = stepsCleaner(analyzedInstructions)
    const allDiets = diets.map((diet)=>diet)
    if(vegetarian){
        allDiets.push('vegetarian') 
    } 
    return {id,name:title,image,summary,healthScore,steps,diets:allDiets}
}

module.exports ={
    stepsCleaner,recipeCleaner
}