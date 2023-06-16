
import { filterDiets } from "./actions";
import { GET_DIETS,POST_RECIPE,GET_ALL,FILTER_DIETS,FILTER_BY_SOURCE, ORDER_BY_NAME, ORDER_BY_HEALTHSCORE,GET_BY_NAME,GET_BY_ID,CLEAN_DETAIL } from "./actionsType"


const initialState ={
    recipes:[],
    auxRecipes:[],
    auxFilterSource:[],
    auxFilterDiet:[],
    diets:[],
    detail:{}
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
            
            return {...state,recipes:payload}

        case GET_BY_ID:
            
        return{
            ...state,detail:payload
        };

        case CLEAN_DETAIL:
            return{
                ...state,detail:{}
            }

            
        case FILTER_DIETS:
             
            const stateCopy =state.auxFilterSource.length?[...state.auxFilterSource]:[...state.auxRecipes]
            let recipesFiltered = []; 
            if(payload==='All'){
                recipesFiltered = state.auxFilterSource.length?[...state.auxFilterSource]:stateCopy;
                return{
                    ...state,recipes:recipesFiltered,auxFilterDiet:[]
                }
            } 

            else recipesFiltered=stateCopy.filter((recipe)=>{
                if(typeof recipe.id !== 'number'){
                    if(recipe.diets.find(diet=>diet.name===payload)) return recipe
                }
                if(recipe.diets.includes(payload)) return recipe
            })
        return{
            ...state,
            recipes:recipesFiltered,auxFilterDiet:recipesFiltered
        }

        case FILTER_BY_SOURCE:
            
            const Copystate = state.auxFilterDiet.length?[...state.auxFilterDiet]:[...state.auxRecipes]
            let filteredBySource =[];
            if(payload==='All') {
                filteredBySource = state.auxFilterDiet.length?[...state.auxFilterDiet]:Copystate;
                return {
                    ...state,recipes:filteredBySource,auxFilterSource:[]
                }
            }
            if(payload==='DB'){
                filteredBySource=state.auxRecipes.filter(recipe=>typeof recipe.id !== 'number'||recipe.id===undefined)
            }
            if(payload==='API'){
                filteredBySource = state.auxRecipes.filter(recipe=>typeof recipe.id === 'number')
            }
            return{
                ...state,recipes:filteredBySource,auxFilterSource:filteredBySource
            };

        case ORDER_BY_NAME:
            const globalRecipes =[...state.recipes]
            let orderedRecipes = [];
            if(payload==='Def')orderedRecipes = [...state.auxRecipes]
            if(payload==='A')  orderedRecipes = globalRecipes.sort((a,b)=> a.name.localeCompare(b.name))
            if(payload==='D')  orderedRecipes = globalRecipes.sort((a,b)=> b.name.localeCompare(a.name))
        
            return{
                ...state,recipes:orderedRecipes
            };    
        case ORDER_BY_HEALTHSCORE:
            
            const copyRecipes =[...state.recipes]
            let orderedByHealthScore = []
            if(payload==='Def')orderedByHealthScore = [...state.auxRecipes]
            if(payload==='A')  orderedByHealthScore=copyRecipes.sort((a,b)=>a.healthScore-b.healthScore);
            if(payload==='D')  orderedByHealthScore=copyRecipes.sort((a,b)=>b.healthScore-a.healthScore)
            return{
                ...state,recipes:orderedByHealthScore
            };   
        default:
            return {...state};
    }
}
export default reducer