import React, {Component} from 'react';
import {linkData} from "./linkData";
import {socialData} from "./socialData";
// import {items} from "./productData";
import {client} from "./contentfull";

const ProductContext = React.createContext();
// Provider
// Consumer
class ProductProvider extends Component {
    state = {
        sidebarOpen:false,
        cartOpen:false,
        cartItems:0,
        links:linkData,
        socialLinks:socialData,
        cart:[],
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
        storeProducts:[],
        filteredProducts:[],
        featuredProducts:[],
        singleProduct:{},
        loading:true,
        search:'',
        price:0,
        minPrice:0,
        maxPrice:0,
        company:'all',
        shipping:false
    };

    componentDidMount() {
        // this.setProducts(items); its from local data
        client.getEntries({content_type:'products'})
            .then((response) => this.setProducts(response.items))
            .catch(console.error)
    }

    setProducts = products => {
        let storeProducts = products.map(item => {
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            return {id, ...item.fields, image};
        });
        let featuredProducts = storeProducts.filter(item =>item.featured === true);
        /// get max price
        let maxPrice = Math.max(...storeProducts.map(item => item.price));
        this.setState({
                storeProducts,
                filteredProducts:storeProducts,
                featuredProducts,
                cart:this.getStorageCart(),
                singleProduct:this.getStorageProduct(),
                loading:false,
                price: maxPrice,
                maxPrice,
        },
            ()=>{
            this.addTotals()
        }
        );
    };

    getStorageCart = () => {
        // eslint-disable-next-line no-unused-vars
        let cart;
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }else {
            cart = []
        }
        return cart;
    };

    getStorageProduct = () => {
        return localStorage.getItem('single_product') ? JSON.parse(localStorage.getItem('single_product')):{}
    };

    getTotal = () => {
        let subTotal = 0;
        let cartItems = 0;
        this.state.cart.forEach(item => {
            subTotal += item.total;
            cartItems += item.count;
        });
        subTotal = parseFloat(subTotal.toFixed(2));
        let tax = subTotal * 0.2;
        tax = parseFloat(tax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));
        return {
            cartItems,
            subTotal,
            tax,
            total
        };
    };
    addTotals = () => {
        const totals = this.getTotal();
        this.setState({
            cartItems: totals.cartItems,
            cartSubTotal: totals.subTotal,
            cartTax: totals.tax,
            cartTotal: totals.total
        });
    };
    /// Sync storage
    syncStorage = () => {
        localStorage.setItem('cart',JSON.stringify(this.state.cart))
    };

    addToCart = id => {
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storeProducts];
        let tempItem = tempCart.find(item => item.id === id);
        if (!tempItem) {
            tempItem = tempProducts.find(item => item.id === id);
            let total = tempItem.price;
            let cartItem = { ...tempItem, count: 1, total };
            tempCart = [...tempCart, cartItem];
        } else {
            tempItem.count++;
            tempItem.total = tempItem.price * tempItem.count;
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
        }
        this.setState(
            () => {
                return { cart: tempCart };
            },
            () => {
                this.addTotals();
                this.syncStorage();
                this.openCart();
            }
        );
    };

    setSingleProduct = (id) => {
        let product =  this.state.storeProducts.find(item =>item.id === id);
        localStorage.setItem('single_product',JSON.stringify(product));
        this.setState({singleProduct:{...product},loading:false});
    };

    handleSidebar = () => {
        this.setState({sidebarOpen:!this.state.sidebarOpen});
    };
    handleCart = () => {
        this.setState({cartOpen:!this.state.cartOpen})
    };
    openCart = () => {
        this.setState({cartOpen:true})
    };
    cartClose = () => {
        this.setState({cartOpen:false})
    };
    /// cart functionality
    increment = (id) => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item=>item.id === id);
        cartItem.count ++;
        cartItem.total = cartItem.count * cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));
        this.setState(()=>{
            return {cart: [...tempCart]}
        },()=>{
            this.addTotals();
            this.syncStorage();
        })
    };
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item=>item.id === id);
        cartItem.count = cartItem.count -1;
        if(cartItem.count === 0){
            this.removeItem(id)
        }else{
            cartItem.total = cartItem.count / cartItem.price;
            cartItem.total = parseFloat(cartItem.total.toFixed(2));
            this.setState(()=>{
                return {cart: [...tempCart]}
            },()=>{
                this.addTotals();
                this.syncStorage();
            })
        }
    };
    removeItem = (id) => {
        let tempItem = [...this.state.cart];
        tempItem = tempItem.filter(item => item.id !== id);
        this.setState({
            cart:[...tempItem]
        },()=>{
            this.addTotals();
            this.syncStorage();
        })
    };
    clearCart = () => {
        this.setState({cart:[]},()=>{
            this.addTotals();
            this.syncStorage();
        })
    };
    /// Handle filtering
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox'?e.target.checked:e.target.value;
        this.setState({
            [name]:value
        },this.sortData)
    };
    sortData = () => {
        const {storeProducts,price,company,shipping,search} = this.state;
        let tempPrice = parseInt(price);
        let tempProduct = [...storeProducts];

        /// filter based on price
        tempProduct = tempProduct.filter(item =>item.price <= tempPrice);
        /// filter based on company
        if (company !== 'all'){
            tempProduct = tempProduct.filter(item =>item.company === company)
        }
        /// filter by shipping
        if(shipping){
            tempProduct = tempProduct.filter(item =>item.freeShipping === true)
        }
        //// filter by search
        if(search.length>0){
             tempProduct = tempProduct.filter(item => {
                let tempSearch = search.toLowerCase();
                let tempTitle = item.title.toLowerCase().slice(0,search.length);
                if (tempSearch === tempTitle){
                    return item;
                }
                return null
            });

        }
        this.setState({filteredProducts:tempProduct})
    };
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleSidebar:this.handleSidebar,
                handleCart:this.handleCart,
                addToCart:this.addToCart,
                openCart: this.openCart,
                cartClose:this.cartClose,
                setSingleProduct:this.setSingleProduct,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart,
                handleChange:this.handleChange
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;

export {ProductProvider,ProductConsumer}
