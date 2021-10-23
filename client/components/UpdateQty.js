import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addToCart} from '../store/productsReducer';
import {Link} from 'react-router-dom';

class UpdateQty extends Component{
    constructor(props){
        super(props);
        const {customerId, product} = this.props;

        this.state = {
            //how does logged in work...?
            customerId : '',
            productQty : '',
            product: product,
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(event){
        this.setState({productQty: event.target.value})
        console.log(event.target.value)
    }
    onSubmit(event){
        const {productQty, product} = this.state;
        console.log(product.name)
        event.preventDefault();
        this.props.addToCart(customerId, product.name, productQty)
    }
    render(){
        const {product} = this.state;
        const stockArr = [];
        for(let i = 1; i<=product.quantity; i++){
            stockArr.push(i)
        }
        const {productQty} = this.state;
        const {onChange, onSubmit} = this
        return(
            <form onSubmit={onSubmit}>
                <select value={productQty} name='productQty' onChange = {onChange}>
                    {stockArr.map(stock =>{
                        return(
                        <option key = {stock} value={stock} onChange = {onChange}>
                            {stock}
                        </option>)
                    })}
                </select>
                <button>Add to Cart</button>
            </form>
        )
    }
}

const mapStateToProps = (state) =>{
    return state;
}

const mapDispatchToProps = (dispatch, {history}) => {
    return{
        addToCart: (customerId, productName, productQty) =>{
            dispatch(addToCart(customerId, productName, productQty, history))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateQty);