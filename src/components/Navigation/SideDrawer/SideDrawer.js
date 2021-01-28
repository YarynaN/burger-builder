import React from 'react';
import PropTypes from 'prop-types'

import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux'
import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, (props.showSidedrawer ? styles.Open : styles.Close)].join(' ');

    return (
        <Aux>
            <div className={attachedClasses} onClick={props.onClose}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
            <Backdrop show={props.showSidedrawer} clicked={props.onClose}/>
        </Aux>
    );
}

sideDrawer.propTypes = {
    showSidedrawer: PropTypes.bool,
    onClose: PropTypes.func
}

export default sideDrawer;