import React from 'react';
import Title from "../Title";
import aboutBcg from '../../images/aboutBcg.jpeg'
const Info = () => {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <img
                            src={aboutBcg}
                            alt="about company"
                            style={{background:"var(--darkGrey)"}}
                            className="img-fluid img-thumbnail"/>
                    </div>
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <Title title="About Store"/>
                        <p className="text-lead text-muted my-3">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Accusantium adipisci asperiores, atque, eum ex ipsam ipsum libero minus optio perspiciatis provident,
                            quasi quod recusandae repellat sapiente sint tempore! Deleniti, neque!
                        </p>
                        <p className="text-lead text-muted my-3">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci asperiores,
                            atque, eum ex ipsam ipsum libero minus optio perspiciatis provident,
                            quasi quod recusandae repellat sapiente sint tempore! Deleniti, neque!
                        </p>
                        <button className="main-link" type="button" style={{marginTop:'2rem'}}>more info</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Info;
