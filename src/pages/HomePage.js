import React from 'react';
import Hero from "../components/Hero";
import {Link} from "react-router-dom";
import {Featured, Services} from "../components/HomePageComponents";

const HomePage = () => {
    return (
        <div>
            <Hero title="awesome gadgets" max="true">
                <Link
                    to="/products"
                    className="main-link"
                    style={{margin:"2rem"}}
                >
                    our products
                </Link>
            </Hero>
            <Services/>
            <Featured/>
        </div>
    );
};

export default HomePage;
