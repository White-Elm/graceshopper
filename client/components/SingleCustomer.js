import React, {Component} from 'react';
import {connect} from 'react-redux';
import UpdateCustomer from './UpdateCustomer';
import {Link} from 'react-router-dom';

const SingleCustomer = ({customers, match: {params: {id}} , history}) =>{
    if(customers.length === 0){
        return (<div>No Customer found here :(</div>)
    }
    const customer = customers.find(customer => customer.id === id*1)
    if(customer === undefined){
        return(<div>No Customer found here :(</div>)
    }
    return(
        <div>
            <Link to='/Admin/Customers'>Back to Manage All Customers</Link>
            <div>Customer Details</div>
            <div>{customer.firstName}</div> 
            <div>{customer.lastName}</div> 
            <div>{customer.address}</div> 
            <UpdateCustomer customer={customer} history={history}/>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(SingleCustomer)