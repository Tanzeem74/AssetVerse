import React, { useEffect } from 'react';
import Hero from './Hero';
import AboutSection from './AboutSection';
import Package from './Package';
import Features from './Features';
import Testimonial from './Testimonial';
import HowItWorks from './HowItWorks';
import Faq from './Faq';
import Contact from './Contact';
import Stats from './Stats';
import NewsLetter from './NewsLetter';
import Highlights from './Highlights';



const Home = () => {
    useEffect(() => {
        document.title = "Home - page";
    }, []);
    return (
        <div className='my-8'>
            <Hero></Hero>
            <AboutSection></AboutSection>
            <Package></Package>
            <Features></Features>
            <Stats></Stats>
            <Highlights></Highlights>
            <Testimonial></Testimonial>
            <HowItWorks></HowItWorks>
            <NewsLetter></NewsLetter>
            <Faq></Faq>
            <Contact></Contact>
        </div>
    );
};

export default Home;