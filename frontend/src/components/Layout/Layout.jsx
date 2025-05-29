import React from 'react';
import HeroSection from  './HeroSection';
import FooterSection from './FooterSection';
import Header from './Header';
import { useLocation } from 'react-router-dom';



const Layout = ({children}) => {

    const {pathname} = useLocation();
    
    
    return (
        <div>
            {pathname === "/" ? <HeroSection /> : <Header />}
            {children}
            <FooterSection />
        </div>
    );
}

export default Layout;
