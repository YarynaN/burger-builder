import React from 'react';
import PropTypes from 'prop-types';

import styles from './MenuButton.module.css'


const menuButton = (props) => {
    return (
        <div className={styles.DrawerToggle} onClick={props.onToggleSideDrawer}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

menuButton.propTypes = {
    onToggleSideDrawer: PropTypes.func
}

export default menuButton;