import React from 'react';
import PropTypes from 'prop-types';

import styles from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";
import MenuButton from '../SideDrawer/menuButton/MenuButton'

const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <MenuButton onToggleSideDrawer={props.onToggleSideDrawer}/>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuthenticated}/>
            </nav>
        </header>
    )
}

toolbar.propTypes = {
    onToggleSideDrawer: PropTypes.func
};

export default toolbar;