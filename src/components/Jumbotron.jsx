import React from "react";
import Iphone from "../assets/images/iphone-14.jpg";
import HoldingIphone from "../assets/images/iphone-hand.png";
function Jumbotron() {

    const handleLearnMore = (event) => {
        event.preventDefault();
        const element = document.getElementById("sound-section");
        if (!element) {
            return;
        }
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top,
            left: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="jumbotron-section wrapper">
            <h2 className="title">New</h2>
            <img className="logo" src={Iphone} alt='iPhone 14 Pro'/>
            <p className="text">Big and bigger.</p>
            <span className="description">    
                    From $41.62/mo.for 24 mo. or $999 before trade-in
            </span>
            <ul className="links">
                <li>
                    <a className="button" href="https://www.apple.com/shop/buy-iphone/iphone-14">Buy</a>
                </li>
                <li>
                    <a className="link" href="#sound-section" onClick={handleLearnMore}>Learn more</a>
                </li>
            </ul> 
            <img className="iphone-img" src={HoldingIphone} alt="iPhone"/>
        </div>
    );
}

export default Jumbotron;
