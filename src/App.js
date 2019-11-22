import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import DefaultPage from "./pages/DefaultPage";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import SideCart from "./components/SideCart";

class App extends Component{
  render() {
    return (
        <div>
          <Router>
            <NavBar/>
            <SideBar/>
            <SideCart/>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/about" component={AboutPage}/>
              <Route path="/contact" component={ContactPage}/>
              <Route exact path="/cart" component={CartPage}/>
              <Route exact path="/products" component={ProductsPage}/>
              <Route path="/products/:id" component={SingleProductPage}/>
              <Route component={DefaultPage}/>
            </Switch>
            <Footer/>
          </Router>
        </div>
    );
  }
}

export default App;
