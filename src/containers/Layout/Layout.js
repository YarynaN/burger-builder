import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import styles from './Layout.module.css'

const  Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    return (
        <Aux>
            <Toolbar onToggleSideDrawer={sideDrawerToggleHandler} isAuthenticated={props.isAuthenticated}/>
            <SideDrawer
                showSidedrawer={showSideDrawer}
                isAuthenticated={props.isAuthenticated}
                onClose={sideDrawerClosedHandler}/>
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);