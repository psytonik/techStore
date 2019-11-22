import React from 'react';
import {ProductConsumer} from "../../context";
import Product from "../product";
import Title from "../Title";
import {Link} from "react-router-dom";

const Featured = () => {
    return (
        <section className="py-5">
            <div className="container">
                <Title title="featured products" center="true"/>
                <div className="row my-5">
                    <ProductConsumer>
                        {value =>{
                            const {featuredProducts} = value;
                            return featuredProducts.map(product=>(
                                            <Product key={product.id} product={product}/>
                                    ))
                        }}
                    </ProductConsumer>
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                        <Link to="/products" className="main-link">
                            Our Products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;
