import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addToCart} from '../store/productsReducer';
import {Link} from 'react-router-dom';

class UpdateQty extends Component{
    constructor(props){
        super(props);
        const {userId, customer, product} = this.props;

        this.state = {
            //how does logged in work...?
            customerId: customer.length ? customer[0].id : null,
            userId : userId, //  debug: includes 'id' for signed in user; if user is not signed in, userId comes back as an empty string
            productQty : '',
            product: product,
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(event){
        this.setState({productQty: event.target.value})
    }
    onSubmit(event){
        const {customerId, productQty, product} = this.state; // debug: included userId
        event.preventDefault();
        // this.props.addToCart(product.name, productQty) 
        const cart = { // debug: I included customerId and other product properties we'll need in the store
            productName: product.name,
            productQty: productQty,
            productTotal: product.cost,
            cartTotal: productQty*product.cost,
            customerId: customerId,
            productId: product.id
        };

        this.props.addToCart(cart);
    }
    render(){
        const {product} = this.state;
        const stockArr = [];
        for(let i = 0; i<=product.quantity; i++){ // debug: I changed 'i' to start from zero bc it was not allowing user to add 1 single item (it showed in the drop down list, but was passed as empty to the store) 
            stockArr.push(i)
        }
        const { productQty } = this.state;
        const {onChange, onSubmit} = this;

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
    return { 
        state,
        isLoggedIn: !!state.auth.id, // debug: checks if user is signed in (returns true or false)
        userId: state.auth.id, // debug: if is signed in user, gets its userId; if user is not signed in, userId comes back as an empty string
        customer: state.customers.filter( customer => customer.userId === state.auth.id),
    };
}

const mapDispatchToProps = (dispatch, {history}) => {
    return{
        // addToCart: (customerId, productName, productQty) =>{
        addToCart: (cart) =>{ // debug: I changed this variable to 'cart' (which is basically all variables combined) bc now I'm passing add'l product variables
            // dispatch(addToCart(customerId, productName, productQty, history))
            dispatch(addToCart(cart, history))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateQty);