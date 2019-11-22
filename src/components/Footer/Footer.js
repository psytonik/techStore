import React from 'react';
import styled from 'styled-components';
import {ProductConsumer} from "../../context";

const Footer = () => {
    return (
        <ProductConsumer >
            {value =>{
                const {socialLinks} = value;
                return (
                    <FooterWrapper>
                        <div className="container py-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="text-capitalize">
                                        copyright &copy; tech store {new Date().getFullYear()}. All rights reserved {" "}
                                    </p>
                                </div>
                                <div className="col-md-6 d-flex justify-content-around">
                                        {socialLinks.map(link =>(
                                                <a key={link.id} href={link.url}>{link.icon}</a>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </FooterWrapper>
                )
            }}
        </ProductConsumer>
    );
};
const FooterWrapper = styled.div`
  background: var(--darkGrey);
  color:var(--mainWhite);
  .icon {
    font-size: 1.5rem;
    color: var(--mainWhite);
    transition: var(--mainTransition);
    
  }
  .icon:hover {
    color:var(--primaryColor);
    cursor: pointer;
  }
`;
export default Footer;
