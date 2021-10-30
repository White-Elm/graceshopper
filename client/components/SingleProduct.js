import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import UpdateQty from './UpdateQty';
//import SimilarProducts from './SimilarProducts'



const SingleProduct = ({products, match: {params: {id}} , history}) =>{
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
            <Link className="back" to='/Products'>Back to Products</Link>
            <div className="singleProduct">
                <div>
                    <img className="singlePimg" src={product.imageUrl ? product.imageUrl : ''}/>
                </div>
                <div className= "productDetails">
                    <div className="productName">{product.name}</div>
                    <hr></hr>
                    <div className="productCost">${product.cost}</div>
                    <div className="productDescription">{product.description}</div>
                    <div className="selectQ"> Please select quantity: </div>
                <UpdateQty product={product} history={history}/>
                </div>
            </div>
            <div className="extraDetails">
                <div> why you'll love it </div>
                <div> details & dimensions </div>
                <div> style tips </div>
                <div> assembly & care </div>
                <div> shipping & returns </div>
                <div> q & a </div>

            </div>
        </div>
    )
}


const mapStateToProps = (state) =>{
    return state
}

export default connect(mapStateToProps)(SingleProduct)

