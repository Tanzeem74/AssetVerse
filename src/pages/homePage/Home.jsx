import React from 'react';
import Hero from './Hero';
import AboutSection from './AboutSection';
import Package from './Package';
import Features from './Features';
import Testimonial from './Testimonial';
import HowItWorks from './HowItWorks';
import Faq from './Faq';
import Contact from './Contact';


const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <AboutSection></AboutSection>
            <Package></Package>
            <Features></Features>
            <Testimonial></Testimonial>
            <HowItWorks></HowItWorks>
            <Faq></Faq>
            <Contact></Contact>
        </div>
    );
};

export default Home;