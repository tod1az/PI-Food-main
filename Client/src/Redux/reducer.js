
import { GET_DIETS,POST_RECIPE,GET_ALL,FILTER_DIETS,FILTER_BY_SOURCE, ORDER_BY_NAME, ORDER_BY_HEALTHSCORE,GET_BY_NAME } from "./actionsType"


const initialState ={
    recipes:[],
    auxRecipes:[],
    diets:[],
};

const reducer =(state = initialState,{type,payload})=>{
    switch(type){
        case GET_DIETS:
        return{
            ...state,diets:payload
        };

        case POST_RECIPE:
            const newRecipes = [...state.recipes]
            newRecipes.push(payload)
        return{
            ...state,recipes:newRecipes
            ,auxRecipes:newRecipes
        }; 


        case  GET_ALL:
            
            const {diets,recipes} = payload;
          
            
            return{
            ...state,diets:diets,recipes:recipes,auxRecipes:recipes
           
            }; 
        case GET_BY_NAME:
            return{
                ...state,recipes:payload
            }

        case FILTER_DIETS:
            let recipesFiltered = []; 
            if(payload==='All') recipesFiltered = state.auxRecipes;

            else recipesFiltered=state.auxRecipes.filter((recipe)=>{
                if(typeof recipe.id !== 'number'){
                    if(recipe.diets.find(diet=>diet.name===payload)) return recipe
                }
                if(recipe.diets.includes(payload)) return recipe
            })
        return{
            ...state,
            recipes:recipesFiltered
        };

        case FILTER_BY_SOURCE:
            let filteredBySource =[];
            if(payload==='All') filteredBySource = state.auxRecipes;
            if(payload==='DB'){
                filteredBySource=state.auxRecipes.filter(recipe=>typeof recipe.id !== 'number'||recipe.id===undefined)
            }
            if(payload==='API'){
                filteredBySource = state.auxRecipes.filter(recipe=>typeof recipe.id === 'number')
            }
            return{
                ...state,recipes:filteredBySource
            };

        case ORDER_BY_NAME:
            let orderedRecipes = [];
            if(payload==='All')orderedRecipes=state.auxRecipes
            if(payload==='A') orderedRecipes = state.recipes.sort((a,b)=> a.name.localeCompare(b.name))
            if(payload==='D') orderedRecipes = state.recipes.sort((a,b)=> b.name.localeCompare(a.name))
        
            return{
                ...state,recipes:orderedRecipes
            };    
        case ORDER_BY_HEALTHSCORE:
            
            let orderedByHealthScore = []
            payload==='A'?orderedByHealthScore=state.recipes.sort((a,b)=>a.healthScore-b.healthScore):orderedByHealthScore=state.recipes.sort((a,b)=>b.healthScore-a.healthScore)
            return{
                ...state,recipes:orderedByHealthScore
            }   
        default:
            return {...state};
    }
}
export default reducer