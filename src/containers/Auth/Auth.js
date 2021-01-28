import React, { Component} from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import styles from './Auth.module.css';
import * as Actions from '../../store/actions/index';
import { updateObject, checkValidity } from "../../shared/utility/utility";

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 7
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }

    componentDidMount() {
        !this.props.buildingBurger && this.props.authRedirectPath !== '/' && this.props.setAuthRedirect();
    }

    onChangedHandler = (e, inputIdentifier) => {
        const updatedState = updateObject(this.state.controls, {
            [inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
                value: e.target.value,
                valid: checkValidity(e.target.value, this.state.controls[inputIdentifier].validation),
                touched: true
            }
            )
        })

        this.setState({
            controls: updatedState,
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.onAuthInitiated(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchToSingInHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        });
    }

    render() {
        let inputs = [];

        for(let element in this.state.controls) {
            inputs.push({
                id: element,
                config: this.state.controls[element]
            })
        }

        let form = inputs.map((element) => {
                return (<Input key={element.id}
                               elementType={element.config.elementType}
                               elementConfig={element.config.elementConfig}
                               value={element.config.value}
                               shouldValidate={element.config.validation}
                               invalid={element.config.touched && !element.config.valid}
                               onChanged={(e) => this.onChangedHandler(e, element.id)}
                />)
            });

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMsg = this.props.error ? (<p>{this.props.error.message}</p>) : null;

        return (
            <div className={styles.Auth}>
                {this.props.isAuthenticated && <Redirect to={this.props.authRedirectPath} />}
                {errorMsg}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button buttonType="Success">Submit</Button>
                </form>
                <Button buttonType="Danger" onClickHandler={this.switchToSingInHandler}>
                    Switch to {this.state.isSignUp ? 'Sign in' : 'Sign up'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.buildingBurger,
        authRedirectPath: state.auth.redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthInitiated: (email, password, isSignUp) => dispatch(Actions.authInitiated(email, password, isSignUp)),
        setAuthRedirect: () => dispatch(Actions.setAuthRedirect("/")),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);