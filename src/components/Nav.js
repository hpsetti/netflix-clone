import {useState,useEffect} from 'react'

import "./Nav.css"

const Nav = () => {

    const [show,handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY >100) {
                handleShow(true);
            }else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener('scroll',null);
        }
    },[])



    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png" alt="Netflix Logo" className="nav__logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix Avatar" className="nav__avatar" />
        </div>
    );
}

export default Nav;