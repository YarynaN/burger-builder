import React from 'react';
import PropTypes from 'prop-types';

import styles from './BuildControl.module.css'

const BuildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <button className={styles.Less} onClick={props.removeIngredient} disabled={props.disabled}>Less</button>
            <div className={styles.Label}>{props.label}</div>
            <button className={styles.More} onClick={props.addIngredient}>More</button>
        </div>
    );
}

BuildControl.propTypes = {
    removeIngredient: PropTypes.func,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    addIngredient: PropTypes.func
};

export default BuildControl;