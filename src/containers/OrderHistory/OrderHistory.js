import React, { Component } from 'react';
import axiosInstance from "../../axios-orders";
import { connect } from "react-redux"

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithError from '../../hoc/withErrorHandler/withErrorHandler';
import * as OrderActions from "../../store/actions/index"

class OrderHistory extends Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        return (
            <div>
                {(this.props.orders && !this.props.loading) ? this.props.orders.map((order) => {
                    return <Order
                            ingredients={order.ingredients}
                            totalPrice={order.totalPrice}
                            key={order.id}/>
                }) : <Spinner/>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(OrderActions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithError(OrderHistory, axiosInstance));