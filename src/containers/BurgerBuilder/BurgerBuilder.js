import React, { Component } from 'react';
import axiosInstance from "../../axios-orders";
import { connect } from "react-redux";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as Actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        purchaseMode: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredient => {
                return ingredients[ingredient]
            }).reduce((sum, val) => {
                return sum + val;
            }, 0)
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchaseMode: true })
        } else {
            this.props.setAuthRedirect("/checkout")
            this.props.history.push("/auth");
        }
    }

    purchaseCancelledHandler = () => {
        this.setState({ purchaseMode: false })
    }

    purchaseProceedHandler = () => {
        this.setState( { loading: true });
        this.props.purchaseInit();

        this.props.history.push({
            pathname: '/checkout'
        });

    }

    render () {
        const disabledRemove = {
            ...this.props.ingredients,
        }

        for (let key in disabledRemove) {
            disabledRemove[key] = disabledRemove[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        disabledRemove={disabledRemove}
                        disableOrder={this.purchasable(this.props.ingredients)}
                        price={this.props.totalPrice}
                        addIngredient={this.props.onAddIngredient}
                        removeIngredient={this.props.onRemoveIngredient}
                        purchasing={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ingredients}
                                         total={this.props.totalPrice}
                                         cancelPurchase={this.purchaseCancelledHandler}
                                         purchaseContinue={this.purchaseProceedHandler}/>;
        }

        return (
            <Aux>
                {burger}
                <Modal show={this.state.purchaseMode} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.buildingBurger
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch(Actions.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(Actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(Actions.initIngredients()),
        purchaseInit: () => dispatch(Actions.purchaseInit()),
        setAuthRedirect: (path) => dispatch(Actions.setAuthRedirect(path)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));