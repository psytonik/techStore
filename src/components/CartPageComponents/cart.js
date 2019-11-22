import React from 'react';
import Title from "../Title";
import CartColumns from "./cartColumns";
import CartList from "./cartList";
import CartTotal from "./cartTotal";
const Cart = ({history}) => {
    return (
        <section className="py-5">
            <div className="container">
                <Title title="Check Out" center/>
            </div>
            <div className="container-fluid">
                <CartColumns/>
                <CartList/>
                <CartTotal history={history}/>
            </div>
        </section>
    );
};

export default Cart;
