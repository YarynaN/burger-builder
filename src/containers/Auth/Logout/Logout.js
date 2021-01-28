import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/auth'

const Logout = props =>  {
    const {onLogout} = props;
    useEffect(() => {
        return () => {
            onLogout();
        }
    }, [onLogout])

    return (
        <Redirect to="/" />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout);