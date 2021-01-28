import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import styles from './Layout.module.css'

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }


    render() {
        return (
            <Aux>
                <Toolbar onToggleSideDrawer={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer
                    showSidedrawer={this.state.showSideDrawer}
                    isAuthenticated={this.props.isAuthenticated}
                    onClose={this.sideDrawerClosedHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);