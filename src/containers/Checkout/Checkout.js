import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from "./ContactForm/ContactForm";

const Checkout = props => {

    const onProceedToCheckout = () => {
        props.history.replace('/checkout/contact-info');
    }

    const onCancelCheckout = () => {
        props.history.goBack();
    }

    let summary = <Redirect to='/'/>

    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to='/'/> : null;
            summary = (
           <div>
               {purchasedRedirect}
               <CheckoutSummary onProceed={onProceedToCheckout}
                                  onCancel={onCancelCheckout}
                                  ingredients={props.ingredients}/>
                <Route path={props.match.path + '/contact-info'}
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);