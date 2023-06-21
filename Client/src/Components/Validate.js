const validateRecipe =({name,image,diets,summary,steps,healthScore})=>{
    healthScore = Number(healthScore)
    let errors={
        name:'',
        image:'',
        steps:'',
        diets:'',
        summary:'',
        healthScore:''
    }
    if(name===''){
        errors.name='Must have a name'
    }
    const tieneNumeros = /^[^\d]+$/
    if(!tieneNumeros.test(name)&&name!==''){
        errors.name="The recipe name can not contain numbers"
    }
    if(image===''){
        errors.image='Must have an image'
    }
    if(diets.length===0){

        errors.diets='Must select at least one diet'
    }
    if(summary===''){
        errors.summary='Must have summary'
    }
    if(healthScore===0||healthScore===''){
        errors.healthScore='Must have Health Score'
    }
    if(healthScore>100||healthScore<0){
        errors.healthScore='Out of range, must be between 0 and 100'
    }
    if(isNaN(healthScore)) {
        errors.healthScore ='Health Score must be a number'
    }
    //revisar que los elementos del array tengan al menos un elemento que tenga un string dentro 

    let stepsFlag = false;
    steps.map(step=>{
        if(step!=='') stepsFlag=true
    })
    if(stepsFlag===false){
        errors.steps = 'Must have at least one step'
    }
    
    return errors
}


export  {validateRecipe};