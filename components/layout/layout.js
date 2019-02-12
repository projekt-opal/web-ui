import React from 'react';
import CSS from './layout.css';
import Header from './header';
import Footer from './footer';
// import Main from './Main';

const Layout = (props) => (
    <div className={CSS.app}>
        <div className={CSS["app-header"]}><Header/></div>
        <div className={CSS["app-body"]}>{props.children}</div>
        <div className={CSS["app-footer"]}><Footer/></div>
    </div>
);

export default Layout;
