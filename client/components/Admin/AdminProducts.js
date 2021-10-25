import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';



const AdminProducts= ({products}) =>{

    return(
        <div>
            <Link to='/admin'>Back to Admin Home</Link>
            <ul>
            {products.map(product =>{
                return(
                    <li key={product.id}>
                        <Link to={`/Admin/Products/${product.id}`}>{ product.name }</Link>
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

export default connect(mapStateToProps)(AdminProducts)