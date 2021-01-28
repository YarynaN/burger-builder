import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>It tastes well</h1>
            <div style={{width: '100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div>
                <Button buttonType="Danger" onClickHandler={props.onCancel}>Cancel</Button>
                <Button buttonType="Success" onClickHandler={props.onProceed}>Proceed</Button>
            </div>
        </div>
    );
}

export default checkoutSummary;