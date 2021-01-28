import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import styles from './Auth.module.css';
import * as Actions from '../../store/actions/index';
import { updateObject, checkValidity } from "../../shared/utility/utility";

const Auth = props => {
    const [controls, setControls] = useState({
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
        }
    })

    const [isSignUp, setIsSignUp] = useState(true);
    const {buildingBurger, authRedirectPath, setAuthRedirect} = props;

    useEffect(() => {
        !buildingBurger && authRedirectPath !== '/' && setAuthRedirect();
    }, [setAuthRedirect, buildingBurger, authRedirectPath])

    const onChangedHandler = (e, inputIdentifier) => {
        const updatedState = updateObject(controls, {
            [inputIdentifier]: updateObject(controls[inputIdentifier], {
                value: e.target.value,
                valid: checkValidity(e.target.value, controls[inputIdentifier].validation),
                touched: true
            }
            )
        })

        setControls(updatedState)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.onAuthInitiated(controls.email.value, controls.password.value, isSignUp);
    }

    const switchToSingInHandler = () => {
        setIsSignUp(!isSignUp)
    }

        let inputs = [];

        for(let element in controls) {
            inputs.push({
                id: element,
                config: controls[element]
            })
        }

        let form = inputs.map((element) => {
                return (<Input key={element.id}
                               elementType={element.config.elementType}
                               elementConfig={element.config.elementConfig}
                               value={element.config.value}
                               shouldValidate={element.config.validation}
                               invalid={element.config.touched && !element.config.valid}
                               onChanged={(e) => onChangedHandler(e, element.id)}
                />)
            });

        if (props.loading) {
            form = <Spinner />
        }

        let errorMsg = props.error ? (<p>{props.error.message}</p>) : null;

        return (
            <div className={styles.Auth}>
                {props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
                {errorMsg}
                <form onSubmit={onSubmitHandler}>
                    {form}
                    <Button buttonType="Success">Submit</Button>
                </form>
                <Button buttonType="Danger" onClickHandler={switchToSingInHandler}>
                    Switch to {isSignUp ? 'Sign in' : 'Sign up'}
                </Button>
            </div>
        );
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