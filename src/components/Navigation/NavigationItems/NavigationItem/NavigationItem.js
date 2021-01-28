import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css'

const navigationItem = (props) => {
    return (
        <li className={styles.NavigationItem}>
            <NavLink to={props.link} exact={props.exact} activeClassName={styles.active}>{props.children}</NavLink>
        </li>
    );
}

navigationItem.propsTypes = {
    link: PropTypes.string,
    active: PropTypes.bool
};

export default navigationItem;