import React from 'react';

import Modal from "../../components/UI/Modal/Modal";
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/httpErrorHandler'

const withErrorHandler = ( WrappedComponent, axios) => {
    return props => {
        const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);
        return (
            <Aux>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    Smth did not work
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        );
    }
}

export default withErrorHandler;