import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';



const AdminCustomers= ({customers}) =>{

    return(
        <div>
            <Link to='/admin'>Back to Admin Home</Link>
            <ul>
            {customers.map(customer =>{
                return(
                    <li key={customer.id}>
                        <Link to={`/Admin/Customers/${customer.id}`}>{ customer.firstName } { customer.lastName }</Link>
                    </li>
                )
            })}
            </ul>
        </div>
    )


}

const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(AdminCustomers)