import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
// import UpdateQty from './UpdateQty';
import UpdateProduct from '../UpdateProduct'
//import SimilarProducts from './SimilarProducts'



const AdminSingleProduct = ({products, match: {params: {id}} , history}) =>{
    if(products.length === 0){
        return <div>No Product found here :(</div>
    }
    const product = products.find(product => product.id === id*1)
    if(product === undefined){
        return (
            <div>No Product found here :(</div>
        )
    }

    return(
        <div>
            <Link className="back" to='/Admin/Products'>Back to Manage All Products</Link>
            <div className="adminSingleProduct">
                <div>
                    <img className="adminSinglePimg" src={product.imageUrl ? product.imageUrl : ''}/>
                </div>
                <div className= "adminProductDetails">
                    <div className="productName">{product.name}</div>
                    <div className="productCost">Price: {product.cost}</div>
                    <div className="productDescription">Product Description : {product.description}</div>
                    <div >Left in Stock : {product.quantity}</div>
                </div>
            <UpdateProduct className="adminUP" product={product} history={history}/>
            </div>

        </div>
    )
}


const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(AdminSingleProduct)

