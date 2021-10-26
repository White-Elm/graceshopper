import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';



const AdminHome = ({}) =>{

    return(
        <div>
            <h1>Welcome to the Admin Page</h1>
            <div>
            <Link to='/Admin/Products'>View All Products</Link>
            </div>
            <div>
            <Link to='/Admin/Customers'>View All Customers</Link>
            </div>
        </div>
    )


}

const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(AdminHome)

