const validateRecipe =({name,image,diets,summary,steps,healthScore})=>{
    let errors={
        name:'',
        image:'',
        steps:'',
        diets:'',
        summary:'',
        healthScore:''
    }
    if(name===''){
        errors.name='Debe tener un nombre'
    }
    if(image===''){
        errors.image='Debe tener una imagen'
        
    }
    if(diets.length===0){
        errors.diets='Debe seleccionar al menos una dieta'
    }
    if(summary===''){
        errors.summary='Debe tener un resumen'
    }
    if(healthScore===0){
        errors.healthScore='Debe tener un Health Score'
    }
    
    return errors
}

const objToArray=(array)=>{
    let newArray=[]
    for(let index in array){
        newArray.push(array[index])
    }
    return newArray;
}

const validateSteps=(steps)=>{
    let stepsArray = objToArray(steps)
    if(!stepsArray.length)return 'Debe tener al menos un paso!'
    return ''
}
export  {validateRecipe,validateSteps};