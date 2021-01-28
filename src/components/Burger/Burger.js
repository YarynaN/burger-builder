import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';
import BurgerBuilder from "../../containers/BurgerBuilder/BurgerBuilder";

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(el => {
            return [...Array(props.ingredients[el])].map((_, i) => {
                return <BurgerIngredient type={el} key={el+i} />;
            }) ;
        })
        .reduce((acc, curr)=> {
            return acc.concat(curr)
        }, [])
        if(transformedIngredients.length === 0) {
            transformedIngredients = <p>Please, start adding ingredients</p>
        }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;