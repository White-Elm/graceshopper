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
            <Link to='/Admin/Products'>Back to Admin Products</Link>
            <div>
                <img src={product.imageUrl ? product.imageUrl : ''}/>
            </div>
            <div>
                <div>{product.name}</div>
                <div>Price: {product.cost}</div>
                <div>Product Description : {product.description}</div>
                <div>Left in Stock : {product.quantity}</div>
            </div>
            <UpdateProduct product={product} history={history}/>
        </div>
    )
}


const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(AdminSingleProduct)

