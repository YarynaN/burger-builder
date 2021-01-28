import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from "./ContactForm/ContactForm";

class Checkout extends Component {

    onProceedToCheckout = () => {
        this.props.history.replace('/checkout/contact-info');
    }

    onCancelCheckout = () => {
        this.props.history.goBack();
    }

    render () {
        let summary = <Redirect to='/'/>

        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
                summary = (
               <div>
                   {purchasedRedirect}
                   <CheckoutSummary onProceed={this.onProceedToCheckout}
                                      onCancel={this.onCancelCheckout}
                                      ingredients={this.props.ingredients}/>
                    <Route path={this.props.match.path + '/contact-info'}
                           component={ContactForm}/>
               </div>)
        }
        return (
            <div>
                <h1>Checkout</h1>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);