import React from 'react';
import { connect } from 'react-redux';

const Cart = ({ cart }) => {
    return (
        <div>
            <ul>
                {cart.map((product) => {
                    return (
                        <li key={product.id}>
                            <h2>
                                { product.productName }
                                ({ product.productQty })
                            </h2>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps)(Cart);