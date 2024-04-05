import React from 'react';
import Logo from '../assets/images/logo.svg';
import Search from '../assets/images/search.svg';
import Store from '../assets/images/store.svg';

function Nav() {
    return (<nav className='nav-wrapper'>
        <div className='nav-content'>
            <ul className='list-styled'>
                <li>
                    <a href='https://www.apple.com/'>
                        <img src={Logo} alt="Apple" />
                    </a>
                </li>
                <li>
                    <a href='https://www.apple.com/store' className='link-styled'>Store</a>
                </li>
                <li>
                    <a href='https://www.apple.com/mac/' className='link-styled'>Mac</a>
                </li>
                <li>
                    <a href='https://www.apple.com/ipad/' className='link-styled'>iPad</a>
                </li>
                <li>
                    <a href='https://www.apple.com/iphone/' className='link-styled'>iPhone</a>
                </li>
                <li>
                    <a href='https://www.apple.com/watch/' className='link-styled'>Watch</a>
                </li>
                <li>
                    <a href='https://www.apple.com/apple-vision-pro/' className='link-styled'>Vision</a>
                </li>
                <li>
                    <a href='https://www.apple.com/airpods/' className='link-styled'>Airpods</a>
                </li>
                <li>
                    <a href='https://www.apple.com/tv-home/' className='link-styled'>Tv & Home</a>
                </li>
                <li>
                    <a href='https://www.apple.com/services/' className='link-styled'>Entertainment</a>
                </li>
                <li>
                    <a href='https://www.apple.com/shop/accessories/all' className='link-styled'>Accessories</a>
                </li>
                <li>
                    <a href='https://support.apple.com/' className='link-styled'>Support</a>
                </li>
                <li>
                    <img src={Search} alt="Search" />
                </li>
                <li>
                    <img src={Store} alt="Store" />
                </li>
            </ul>     
        </div>
    </nav> );
}

export default Nav;