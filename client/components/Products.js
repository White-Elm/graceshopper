import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = ({ products }) => {
    return (
        <div>
            <ul>
                {products.map((product) => {
                    return (
                        <li key={product.id}>
                            <h2>
                                <Link to={`/products/${product.id}`}> { product.name }, price: { product.cost} </Link>
                            </h2>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps)(Products);