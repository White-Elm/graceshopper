import React, { Component } from 'react'
import {connect} from 'react-redux'

//import SimilarProducts from './SimilarProducts'


class SingleProduct extends Component{
    constructor(props){
        super(props)
        const {products, match: {params: {id} }} = this.props
        const product = products.find(product =>{ product.id === id*1}) ? products.find(product =>{ product.id === id*1}) : ''
        console.log(product)
        const productid = product.id
        this.state = {
            productQty: 0,
            
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidUpdate(prevProps){
        if(!prevProps.product.id && productid){
            this.setState({
                productQty: productQty,
            })
        }
    }
    
    onSubmit(event){
        if(productQty === ''){
            productQty = 0;
        }
        this.props.addToCart(productid, productQty)
    }
    onChange(event){
        const change = {};
        change[event.target.name] = event.target.value;
        this.setState(change)
    }
    render(){  
        const {product} = this.state;
        console.log(product)
        return(
            <div>
                <img src={product.imageUrl ? product.imageUrl : ''}/>
                <div>
                    {product.name}
                    {product.price}
                    {product.description}
                </div>
                <form>
                    <label>Qty.</label>
                    <input value={initalQty} name='qty' onChange={onChange}/>
                    <button>Add to Cart</button>
                </form>
                <SimilarProducts/>
            </div>
        )
    }

}


const mapStateToProps = (state) =>{
    return state
}
const mapDispatchToProps = (dispatch, {history}) =>{
    return{
        addToCart: (productid, productQty) =>{
            dispatch(addToCart(productid, productQty))
        }
    }
}
export default connect (mapStateToProps)(SingleProduct)


/*
class SingleProduct extends Component{
    constructor(){
        super()
    }
    render(){
        const {products, match: {params: {id} }} = this.props
        //const products = [{name: cup}, {name: bowl}, {name: spoon}]
        console.log(products)
        return (
            <div>
                <ul>
                {products.map(product =>{
                    return(
                        <li>
                        {product.name}
                    </li>
                    )
                })}
                </ul>
            </div>

        )
    }

}

const mapStateToProps = (state) =>{
    return state
}
export default connect (mapStateToProps)(SingleProduct)

*/