import React from 'react';
import Hero from "../components/Hero";
import contactBcg from '../images/contactBcg.jpeg';
import Contact from "../components/ContactPageComponent/Contact";

const ContactPage = () => {
    return (
        <>
            <Hero img={contactBcg}/>
            <Contact/>
        </>
    );
};

export default ContactPage;
