import React, {Fragment} from 'react';
import CartItem from "./cartItem";
import {ProductConsumer} from "../../context";

const CartList = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <ProductConsumer>
                        {value=>{
                            const {cart,increment,decrement,removeItem} = value;
                            if(cart.length === 0){
                                return <h1 className="text-title my-4 text-center">You cart is empty</h1>
                            }
                            return (
                                <Fragment>
                                    {cart.map(item=>(<CartItem
                                        cartItem={item}
                                        key={item.id}
                                        increment={increment}
                                        decrement={decrement}
                                        removeItem={removeItem}
                                    />))}
                                </Fragment>
                            )
                        }}
                    </ProductConsumer>
                </div>
            </div>
        </div>
    );
};

export default CartList;
