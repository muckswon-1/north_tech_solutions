import React from 'react';
import HeroSection from  './HeroSection';
import FooterSection from './FooterSection';
import Header from './Header';
import { useLocation } from 'react-router-dom';



const Layout = ({children}) => {

    const {pathname} = useLocation();
    
    
    return (
        <div className='min-h-screen flex flex-col'>
            {pathname === "/" ? <HeroSection /> : <Header />}
            <main className='flex-1'>
                {children}
            </main>
            
            <FooterSection />
        </div>
    );
}

export default Layout;
