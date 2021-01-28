import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from "../../axios-orders";
import { connect, useDispatch, useSelector } from "react-redux";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as Actions from '../../store/actions/index';

const BurgerBuilder = (props) => {
    const [purchaseMode, setPurchaseMode] = useState(false);
    const dispatch = useDispatch();

    const ingredients =  useSelector(state => {
        return state.burgerBuilder.ingredients;
    });

    const totalPrice =  useSelector(state => {
        return state.burgerBuilder.totalPrice;
    });

    const error =  useSelector(state => {
        return state.burgerBuilder.error;
    });

    const isAuthenticated =  useSelector(state => {
        return state.auth.token !== null;
    });

    const buildingBurger =  useSelector(state => {
        return state.burgerBuilder.buildingBurger;
    });

    const onAddIngredient = (ingredientName) => dispatch(Actions.addIngredient(ingredientName));
    const onRemoveIngredient = (ingredientName) => dispatch(Actions.removeIngredient(ingredientName));
    const onInitIngredients = useCallback(() => dispatch(Actions.initIngredients()), []);
    const purchaseInit = () => dispatch(Actions.purchaseInit());
    const setAuthRedirect = (path) => dispatch(Actions.setAuthRedirect(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const purchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredient => {
                return ingredients[ingredient]
            }).reduce((sum, val) => {
                return sum + val;
            }, 0)
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchaseMode(true)
        } else {
            setAuthRedirect("/checkout")
            props.history.push("/auth");
        }
    }

    const purchaseCancelledHandler = () => {
        setPurchaseMode(false)
    }

    const purchaseProceedHandler = () => {
        purchaseInit();

        props.history.push({
            pathname: '/checkout'
        });

    }

    const disabledRemove = {
        ...ingredients,
    }

    for (let key in disabledRemove) {
        disabledRemove[key] = disabledRemove[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    if (ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={ingredients}/>
                <BuildControls
                    disabledRemove={disabledRemove}
                    disableOrder={purchasable(ingredients)}
                    price={totalPrice}
                    addIngredient={onAddIngredient}
                    removeIngredient={onRemoveIngredient}
                    purchasing={purchaseHandler}
                    isAuthenticated={isAuthenticated}
                />
            </Aux>
        );
        orderSummary = <OrderSummary ingredients={ingredients}
                                     total={totalPrice}
                                     cancelPurchase={purchaseCancelledHandler}
                                     purchaseContinue={purchaseProceedHandler}/>;
    }

    return (
        <Aux>
            {burger}
            <Modal show={purchaseMode} modalClosed={purchaseCancelledHandler}>
                {orderSummary}
            </Modal>
        </Aux>
    );
}

export default withErrorHandler(BurgerBuilder, axiosInstance);