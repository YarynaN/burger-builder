import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from './containers/Auth/Logout/Logout';
import * as Actions from './store/actions/index';
import AsyncComponent from "./hoc/asyncComponent/AsyncComponent";

const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));

const AsyncOrders = React.lazy(() =>  import('./containers/OrderHistory/OrderHistory'));

const AsyncAuth = React.lazy(() =>  import('./containers/Auth/Auth'));

class App extends Component {

    componentDidMount() {
        this.props.onCheckToAuthenticate();
    }

    render () {
        let routes = (
            <Suspense fallback={<div>Loading....</div>}>
                <Switch>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Route path="/auth" component={AsyncAuth}/>
                    <Redirect to="/"/>
                </Switch>
            </Suspense>
        )

        if (this.props.isAuthenticated) {
            routes = (<Suspense fallback={<div>Loading....</div>}>
                <Switch>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Route path="/checkout" component={AsyncCheckout}/>
                    <Route path="/orders" component={AsyncOrders}/>
                    <Route path="/logout" component={Logout}/>
                    <Redirect to="/"/>
                </Switch>
            </Suspense>)
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckToAuthenticate: () => dispatch(Actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
