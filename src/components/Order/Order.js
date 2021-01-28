import React from 'react';

import styles from './Order.module.css'

const order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({name: ingredient, amount: props.ingredients[ingredient]});
    }
    const ingredientOutput = ingredients.map((el) => {
        return <span style={{textTransform: "capitalize", margin: "0 8pxs"}} key={el.name}>{el.name} ({el.amount}) </span>
    })

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.totalPrice).toFixed(2)}</strong></p>

        </div>
    );
}

export default order;