import React from 'react';
import PropTypes from 'prop-types';

import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isAuthenticated &&
            <NavigationItem link="/orders">Orders</NavigationItem>}
            {props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Authenticate</NavigationItem>}
        </ul>
    );
};

NavigationItems.propTypes = {
    isAuthenticated: PropTypes.bool
}

export default NavigationItems;