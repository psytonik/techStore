import React from 'react';
import Hero from "../components/Hero";
import aboutBcg from '../images/aboutBcg.jpeg'
import Info from "../components/AboutPageComponents/Info";
const AboutPage = () => {
    return (
        <>
            <Hero img={aboutBcg} max="true" />
            <Info/>
        </>
    );
};

export default AboutPage;
