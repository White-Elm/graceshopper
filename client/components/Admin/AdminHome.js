import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';



const AdminHome = ({}) =>{

    return(
        <div>
            <h1>Welcome to the Admin Page</h1>
            <div className="adminHome">
                <div className="manage">
                    <img className="adminImages" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNenHD5fvyNxbzvsEqkTceyUSf63AAQgtwEA&usqp=CAU"/>
                    <Link to='/Admin/Products'>Manage Products</Link>
                </div>
                <div className="manage">
                    <img className="adminImages" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkZBD6kU9JTXEgE7yeYKY6zcjyBTQHALAliQ&usqp=CAU"/>
                    <Link to='/Admin/Customers'>Manage Customers</Link>
                </div>
            </div>
        </div>
    )


}

const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(AdminHome)

