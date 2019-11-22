import React from 'react';
import Cart from "../components/CartPageComponents";
import Hero from "../components/Hero";
import cartBcg from "../images/storeBcg.jpeg";

const CartPage = (props) => {
    return (
        <div>
            <Hero img={cartBcg} />
            <Cart history={props.history}/>
        </div>
    );
};

export default CartPage;
