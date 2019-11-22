import React from 'react';
import Title from "../Title";
const Contact = () => {
    return (
        <section className="py-5">
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <Title title="Contact Us"/>
                    <form className="mt-5" action="https://formspree.io/psytonik@icloud.com" method="POST">
                        <div className="form-group">
                            <input type="text" name="fullName" className="form-control" placeholder="Full Name" required/>
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" className="form-control" placeholder="Email" required/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="subject" className="form-control" placeholder="Subject" required/>
                        </div>
                        <div className="form-group">
                            <textarea name="message" rows="10" className="form-control" placeholder="Your message" required>

                            </textarea>
                        </div>
                        <div className="form-group mt-3">
                            <input type="submit" name="submit" value="Send" className="form-control bg-primary text-white"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
