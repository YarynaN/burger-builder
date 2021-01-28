import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from './containers/Auth/Logout/Logout';
import * as Actions from './store/actions/index';

const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));

const AsyncOrders = React.lazy(() =>  import('./containers/OrderHistory/OrderHistory'));

const AsyncAuth = React.lazy(() =>  import('./containers/Auth/Auth'));

const App = (props) =>  {
    const { onCheckToAuthenticate } = props;
    useEffect(()=> {
        onCheckToAuthenticate();
    }, [onCheckToAuthenticate]);

    let routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/auth" component={(props) => <AsyncAuth {...props}/>}/>
                <Redirect to="/"/>
            </Switch>
    )

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/checkout" render={(props) => <AsyncCheckout {...props}/>}/>
                <Route path="/orders" render={(props) => <AsyncOrders {...props}/>}/>
                <Route path="/logout" component={Logout}/>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<div>Loading....</div>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
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
