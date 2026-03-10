import { useState } from 'react';
import { motion } from 'framer-motion';
import './Impact.css';

const Impact = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const slides = [
        { src: '/Impact (2).jpg', alt: 'Impact 2' }
    ];

    const nextSlide = () => setSlideIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    return (
        <section id="impact" className="section-padding">
            <motion.div
                className="max-w-screen-xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                <h2>Impact Highlights So Far</h2>
                <div className="grid-3 impact-highlights">
                    <div className="card">
                        <div className="impact-number">1,500+</div>
                        <p>Attendees at Youth Spark Summit 2025</p>
                    </div>
                    <div className="card">
                        <div className="impact-number">20+</div>
                        <p>Universities Reached, 1,000+ Students Engaged</p>
                    </div>
                    <div className="card">
                        <div className="impact-number">Growing</div>
                        <p>Network of Leaders, Influencers, and Mentors</p>
                    </div>
                </div>

                <div className="carousel-container">
                    {slides.map((slide, index) => (
                        <img
                            key={index}
                            className={`carousel-slide ${index === slideIndex ? 'active' : ''}`}
                            src={slide.src}
                            alt={slide.alt}
                            loading="lazy"
                        />
                    ))}
                    <button className="carousel-btn prev-btn" onClick={prevSlide} aria-label="Previous image">&#10094;</button>
                    <button className="carousel-btn next-btn" onClick={nextSlide} aria-label="Next image">&#10095;</button>
                </div>
            </motion.div>
        </section>
    );
};

export default Impact;
