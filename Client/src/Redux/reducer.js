

import { GET_DIETS,GET_ALL,FILTER_DIETS,FILTER_BY_SOURCE, ORDER_BY_NAME, ORDER_BY_HEALTHSCORE,GET_BY_NAME,GET_BY_ID,CLEAN_DETAIL,RESTORE } from "./actionsType"


const initialState ={
    recipes:[],
    searchedRecipes:[],
    auxRecipes:[],
    currentSource:'All',
    currentDiets:'All',
    diets:[],
    detail:{}
};

const reducer =(state = initialState,{type,payload})=>{
    switch(type){
        case GET_DIETS:
            return{
                ...state,diets:payload
            };

        case  GET_ALL:
            
            const {diets,recipes} = payload;
          
            
            return{
            ...state,diets:diets,recipes:recipes,auxRecipes:recipes
           
            }; 
        case GET_BY_NAME:
            
            return {...state,recipes:payload,searchedRecipes:payload};
        
        case RESTORE:
            return {...state,recipes:state.auxRecipes,searchedRecipes:[]};    
            
        case GET_BY_ID:
            
            return{
                ...state,detail:payload
            };

        case CLEAN_DETAIL:
            return{
                ...state,detail:{}
            }

            
        case FILTER_DIETS:
             
            const allrecipes = state.searchedRecipes.length!==0?[...state.searchedRecipes]:[...state.auxRecipes]    
            let recipesFiltered = []; 
            if(payload==='All'){
                    
                    if(state.currentSource==='DB')recipesFiltered=allrecipes.filter(recipe=>typeof recipe.id !=='number');
                   
                    if(state.currentSource==='API')recipesFiltered=allrecipes.filter(recipe=>typeof recipe.id==='number');
                    
                    if(state.currentSource==='All')recipesFiltered=allrecipes;        
                    
                return{
                    ...state,recipes:recipesFiltered,currentDiets:payload
                }
            } 
            else recipesFiltered=allrecipes.filter((recipe)=>{
               
                if(state.currentSource==='DB'||state.currentSource==='All'&&typeof recipe.id !== 'number'){
                    if(recipe.diets.find(diet=>diet.name===payload)) return recipe
                }
                if(state.currentSource==='API'||state.currentSource==='All'&&typeof recipe.id ==='number') {
                    if(recipe.diets.includes(payload))return recipe
                }
            })
            return{
                ...state,
                recipes:recipesFiltered,currentDiets:payload
            }

        case FILTER_BY_SOURCE:
            
            const Copystate = state.searchedRecipes.length!==0?[...state.searchedRecipes]:[...state.auxRecipes]
            let filteredBySource =[];
            if(payload==='All') {
                if(state.currentDiets==='All')filteredBySource = Copystate;
                else{
                    filteredBySource = Copystate.filter(recipe=>{
                        if(typeof recipe.id === 'number'){
                            if(recipe.diets.includes(state.currentDiets))return recipe
                        }else if(recipe.diets.find(diet=>diet.name===state.currentDiets)) return recipe
                    })
                }
            }

            if(state.currentDiets==='All'){
                if(payload==='DB'){
                        filteredBySource=Copystate.filter(recipe=>typeof recipe.id !== 'number')
                }
                if(payload==='API'){
                        filteredBySource = Copystate.filter(recipe=>typeof recipe.id === 'number')
                 }
            }else{

                if(payload==='DB'){
                    filteredBySource=Copystate.filter(recipe=>typeof recipe.id !== 'number'&&recipe.diets.find(diet=>diet.name===state.currentDiets))
                }
                if(payload==='API'){
                     filteredBySource = Copystate.filter(recipe=>typeof recipe.id === 'number'&&recipe.diets.includes(state.currentDiets))
                    }
            }
            return{
                    ...state,recipes:filteredBySource,currentSource:payload
            };
            
           
            

        case ORDER_BY_NAME:
            const globalRecipes =[...state.recipes]
            const copyAux =[...state.auxRecipes]
            let orderedRecipes = [];
            if(payload==='Def'&&(state.currentDiets==='All'&&state.currentSource==='All')) {
                orderedRecipes = state.searchedRecipes.length!==0?[...state.searchedRecipes]:[...state.auxRecipes]
            }
            else{
                orderedRecipes = copyAux.filter(recipe=>{
                    if(state.currentSource==='API'||state.currentSource==='All'&&typeof recipe.id==='number'){
                        if(state.currentDiets==='All')return recipe
                        else{
                            if(recipe.diets.includes(state.currentDiets))return recipe   
                        } 
                            
                    }
                    if(state.currentSource==='DB'||state.currentSource==='All'&&typeof recipe.id!=='number'){
                        if(state.currentDiets==='All')return recipe
                        else {
                            if(recipe.diets.find(diet=>diet.name===state.currentDiets))return recipe
                        }
                    }
                })
            }
            
            if(payload==='A')  orderedRecipes = globalRecipes.sort((a,b)=> a.name.localeCompare(b.name))
            if(payload==='D')  orderedRecipes = globalRecipes.sort((a,b)=> b.name.localeCompare(a.name))
        
            return{
                ...state,recipes:orderedRecipes
            };    
        case ORDER_BY_HEALTHSCORE:
            
            const copyRecipes =[...state.recipes]
            const auxCopy =[...state.auxRecipes]
            let orderedByHealthScore = []
            if(payload==='Def'&&(state.currentDiets==='All'&&state.currentSource==='All')){
                orderedByHealthScore = state.searchedRecipes.length!==0?[...state.searchedRecipes]:[...state.auxRecipes]
            }
            else{
                orderedByHealthScore = auxCopy.filter(recipe=>{
                    if(state.currentSource==='API'||state.currentSource==='All'&&typeof recipe.id==='number'){
                        if(state.currentDiets==='All')return recipe
                        else{
                            if(recipe.diets.includes(state.currentDiets))return recipe   
                        } 
                            
                    }
                    if(state.currentSource==='DB'||state.currentSource==='All'&&typeof recipe.id!=='number'){
                        if(state.currentDiets==='All')return recipe
                        else {
                            if(recipe.diets.find(diet=>diet.name===state.currentDiets))return recipe
                        }
                    }
                })
            }

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