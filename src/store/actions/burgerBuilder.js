import * as ActionTypes from './actionTypes';

export const addIngredient = (ingredientName) => {
    return {
        type: ActionTypes.ADD_INGREDIENT,
        payload: {
            ingredientName: ingredientName
        }
    }
};

export const removeIngredient = (ingredientName) => {
    return {
        type: ActionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredientName: ingredientName
        }
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: ActionTypes.SET_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: ActionTypes.FETCH_INGREDIENT_FAILED,
    };
}

export const initIngredients = () => {
    return {
        type: ActionTypes.GET_INGREDIENTS
    }
}