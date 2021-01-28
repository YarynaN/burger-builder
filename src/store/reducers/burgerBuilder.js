import * as ActionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility/utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    buildingBurger: false
};

const INGREDIENT_PRICES = {
    cheese: 1.3,
    salad: 1,
    bacon: 2,
    meat: 3.75,
};

const addIngredient = (state, action) => {
    const updatedIngredient = updateObject(state.ingredients, {
        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
    })
    return updateObject(state, {
        ingredients: updatedIngredient,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
        buildingBurger: true
    });
}

const removeIngredient = (state, action) => {
    const updatedRemoveIngredient = updateObject(state.ingredients, {
        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
    })
    return updateObject(state, {
        ingredients: updatedRemoveIngredient,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
        buildingBurger: Object.keys(updatedRemoveIngredient).length !== 0
    })
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.payload.ingredients,
        error: false,
        totalPrice: 4,
        buildingBurger: false
    })
}

const fetchIngredientsFailed = (state) => {
    return updateObject(state, {
        error: true
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ActionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case ActionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case ActionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case ActionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientsFailed(state);
        default: return state;
    }
}

export default reducer;