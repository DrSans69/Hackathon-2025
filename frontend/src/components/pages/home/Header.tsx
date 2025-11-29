import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav className="header__navigation ">
                <div className="header__logo-wrapper">
                    {/* <svg className="header__logo" width="20" height="20">
                        <use href="../imgs/icons.logo" />
                    </svg> */}
                    <div className="header__logo"></div>
                </div>
                <button className="header__btn-login" type="button">
                    Login
                </button>
            </nav>
        </header>
    );
};

export default Header;
