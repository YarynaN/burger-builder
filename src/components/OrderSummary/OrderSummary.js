import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button'
// import styles from './OrderSummary.module.css'

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((key, i) => {
            return <li key={key+i}>
                    <span style={{ textTransform: 'capitalize' }}>
                        {key}
                    </span>:
                {props.ingredients[key]}
            </li>
        })

    return (
        <Aux>
            <h1>Your Order</h1>
            <p>Delicious Burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Your Total is: {props.total.toFixed(2)}$</strong></p>
            <p>Would you like to proceed to Checkout?</p>
            <div>
                <Button buttonType={'Success'} onClickHandler={props.purchaseContinue}>Checkout</Button>
                <Button buttonType={'Danger'} onClickHandler={props.cancelPurchase}>Close</Button>
            </div>
        </Aux>
    )
}

OrderSummary.propTypes = {
    purchaseContinue: PropTypes.func,
    cancelPurchase: PropTypes.func,
    total: PropTypes.number,
    ingredients: PropTypes.object,
}

export default OrderSummary;