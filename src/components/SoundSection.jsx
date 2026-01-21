import React from 'react';

function SoundSection() {

    const handleLearnMore = (event) => {
        event.preventDefault();
        const element = document.getElementById("display-section");
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
        <div className='sound-section wrapper' id="sound-section">
            <div className='body'>
                <div className='sound-section-content content'>
                        <h2 className='title'>New Sound System</h2>
                        <p className='text'>Feel the base.</p>
                        <span className='description'>
                            From $41.62/mo.for 24 mo. or $999 before trade-in
                        </span>
                        <ul className='links'>
                            <li>
                            <a className="button" href="https://www.apple.com/shop/buy-iphone/iphone-14">Buy</a>
                            </li>
                            <li> 
                                <a className='link' href="#display-section" onClick={handleLearnMore}>Learn more</a>
                            </li>
                        </ul>
                </div>
            </div>
        </div>
    );
}

export default SoundSection;
