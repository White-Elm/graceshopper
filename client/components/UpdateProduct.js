import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProduct} from '../store/productsReducer'
import {Link} from 'react-router-dom';


class UpdateProduct extends Component {
    constructor(props){
        super(props);
        const {product} = this.props;
        this.state = {
            productId: product.id ? product.id : '',
            productName : product.name ? product.name : '',
            productDescription : product.description ? product.description : '',
            productQuantity : product.quantity ? product.quantity : '',
            productCost : product.cost ? product.cost : '',
            //productImg : product.imageUrl ? product.imageUrl : '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event){
        const change = {};
        change[event.target.name] = event.target.value;
        console.log(change)
        this.setState(change);
    }
    onSubmit(event){
        const {productId, productName, productDescription, productQuantity, productCost} = this.state;
        event.preventDefault();
        if(productName === ''){
            window.alert('Product name is required')
        }
        else if(productQuantity === ''){
            window.alert('Product quantity is required')
        }
        else if(productCost === ''){
            window.alert('Product Cost is required')
        }
        else{
            this.props.updateProduct(productId, productName, productDescription, productQuantity, productCost);
        }
    }
    render(){
        const {product} = this.props;
        const {productName, productDescription, productQuantity, productCost} = this.state
        const {onChange, onSubmit} = this
        // <label>Image Url</label>
        // <input value={product.imageUrl} name='productImg' onChange={onChange}/>
        return(
            <div className="adminUpdateP">
                <form name='updateProductForm' onSubmit={onSubmit}>
                    <label>Product Name</label>
                    <input value={productName} name='productName' onChange={onChange}/>
                    <label>Product Description</label>
                    <input value={productDescription} name='productDescription' onChange={onChange}/>
                    <label>Quantity</label>
                    <input value={productQuantity} name='productQuantity' onChange={onChange}/>
                    <label>Cost</label>
                    <input value={productCost} name='productCost' onChange={onChange}/>
                    <br/>
                    <button>Update Product</button>
                </form>
            </div>
        )

    }
}

const mapStateToProps = (state) =>{
    return state;
}

const mapDispatchToProps = (dispatch, {history}) =>{
    return {
        updateProduct: (productId, productName, productDescription, productQuantity, productCost) =>{
            dispatch(updateProduct(productId, productName, productDescription, productQuantity, productCost, history))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
