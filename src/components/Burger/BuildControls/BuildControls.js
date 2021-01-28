import React from 'react';
import PropTypes from 'prop-types';

import styles from './BuildControl.module.css';
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <h3> Current Prise: <strong>{props.price.toFixed(2)}</strong></h3>
            { controls.map((control) => (
                <BuildControl
                    disabled={props.disabledRemove[control.type]}
                    label={control.label}
                    key={control.label}
                    removeIngredient={() => props.removeIngredient(control.type)}
                    addIngredient={() => props.addIngredient(control.type)}
                />))
            }
            <button className={styles.OrderButton}
                    onClick={props.purchasing}
                    disabled={!props.disableOrder}>
                {props.isAuthenticated ? 'Order Now' : 'Signup to Order'}
            </button>
        </div>
    );
};

buildControls.propTypes = {
    purchasing: PropTypes.func,
    disableOrder: PropTypes.bool,
    price: PropTypes.number,
    addIngredient: PropTypes.func,
    removeIngredient: PropTypes.func
};

export default buildControls;