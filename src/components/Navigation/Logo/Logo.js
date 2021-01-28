import React from 'react';

import image from '../../../assets/images/burger-logo.png'
import styles from './Logo.module.css';

const logo = () => {
    return (
        <div className={styles.Logo}>
            <img src={image} alt="burger logo" />
        </div>
    );
}

export default logo;