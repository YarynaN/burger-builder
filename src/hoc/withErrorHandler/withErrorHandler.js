import React, { Component } from 'react';

import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Aux/Aux'
import axiosInstance from "../../axios-orders";

const withErrorHandler = ( WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null

        }

        errorConfirmedHandler = () => {
             this.setState({error: null})
        }

        componentWillUnmount() {
            axiosInstance.interceptors.request.eject(this.requestInterceptor);
            axiosInstance.interceptors.response.eject(this.responseInterceptor);
        }

        render () {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, response => {
                this.setState({error: response});
            })

            return (
                <Aux>
                    <WrappedComponent {...this.props}/>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        Smth did not work
                        {this.state.error ? this.state.error.message : null}
                    </Modal>;
                </Aux>
            );
        }
    }
}

export default withErrorHandler;