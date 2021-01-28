import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactForm.module.css';
import * as OrderActions from '../../../store/actions/index';
import axiosInstance from "../../../axios-orders";
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from "../../../shared/utility/utility";

class ContactForm extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 4
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 8
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 4,
                    maxLength: 8
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 4
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 6
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'standard', displayValue: 'Standard'},
                        {value: 'fast', displayValue: 'Fast'},
                        {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                validation: {},
                value: 'standard',
                valid: true,
            },
        },
        validForm: false,
    }

    orderHandler = (e) => {
        e.preventDefault();
        const orderData = {};
        for (let el in this.state.orderForm) {
            orderData[el] = this.state.orderForm[el].value;
        }
        const data = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: orderData,
            userId: this.props.userId
        }
        this.props.onPostOrder(data, this.props.token);
    }

    onChangedHandler = (e, inputIdentifier) => {
        const updatedFormEl = updateObject(this.state.orderForm[inputIdentifier], {
            value:  e.target.value,
            valid: checkValidity(e.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedState = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormEl
        })
        let formValid = true;
        for (let inputID in updatedState) {
            formValid = updatedState[inputID].valid && formValid;
        }

        this.setState({
            orderForm: updatedState,
            validForm: formValid
        })
    }

    render() {
        let inputs = [];

        for(let element in this.state.orderForm) {
            inputs.push({
                id: element,
                config: this.state.orderForm[element]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputs.map((element) => {
                    return (<Input key={element.id}
                           elementType={element.config.elementType}
                           elementConfig={element.config.elementConfig}
                           value={element.config.value}
                           shouldValidate={element.config.validation}
                           invalid={element.config.touched && !element.config.valid}
                           onChanged={(e) => this.onChangedHandler(e, element.id)}
                    />)
                })}
                <Button className={styles.Input} buttonType="Success" disabled={!this.state.validForm}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={styles.ContactForm}>
                <h3>Please enter all necessary info</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        totalPrice: state.burgerBuilder.totalPrice,
        ingredients: state.burgerBuilder.ingredients,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onPostOrder: (data, token) => dispatch(OrderActions.postOrder(data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactForm, axiosInstance));