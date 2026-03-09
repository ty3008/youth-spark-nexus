import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Audience = () => {
    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
    const sliderSettings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, autoplay: true, arrows: false };

    return (
        <section id="audience" className="section-padding bg-[#0d0d0d]">
            <motion.div
                className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                <div className="w-full lg:w-1/2">
                    <h2>Who We Serve</h2>
                    <ul className="icon-list">
                        <li>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" /></svg>
                            University Students
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4Z" /></svg>
                            Recent Graduates & Professionals
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" /></svg>
                            Student Leaders & Influencers
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2ZM14.85 13.1L14 13.7V16H10V13.7L9.15 13.1C7.8 12.16 7 10.63 7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 10.63 16.2 12.16 14.85 13.1Z" /></svg>
                            Young Entrepreneurs & Creatives
                        </li>
                    </ul>

                    <div style={{ marginTop: '30px' }}>
                        <svg className="world-map-svg" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-label="Detailed Map of Africa and Kenya">
                            <title>Africa and Kenya Detail</title>
                            <defs>
                                <pattern id="kenya-img" x="0" y="0" height="1" width="1" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                                    <image x="0" y="0" width="100" height="100" href="/kenya-vision.png" />
                                </pattern>
                            </defs>
                            {/* Detailed Africa Outline */}
                            <path
                                d="M172.9,119.5c0,0,1.2,4.1,1.2,4.1c0,0,7.6-1.3,7.6-1.3c0,0,7.9,0.9,7.9,0.9c0,0,6.6-1.5,6.6-1.5c0,0,2.3-2.6,2.3-2.6c0,0,2.2,3.8,2.2,3.8c0,0,2.5-0.3,2.5-0.3c0,0,2.3,3.1,2.3,3.1c0,0,4.2,0,4.2,0c0,0-1.2,1.6-1.2,1.6c0,0,2.7,1.5,2.7,1.5c0,0,0.9,4.6,0.9,4.6c0,0,1.8,1.8,1.8,1.8c0,0-0.1,3.4-0.1,3.4c0,0-1.9,1.6-1.9,1.6c0,0,1,1.9,1,1.9c0,0-0.9,2.4-0.9,2.4c0,0,0.8,2.6,0.8,2.6c0,0,3.7-0.7,3.7-0.7c0,0,2.1,2.2,2.1,2.2c0,0,3.4,2.4,3.4,2.4c0,0,1.1,3.5,1.1,3.5c0,0-1.8,3.9-1.8,3.9c0,0-2.3,0.5-2.3,0.5c0,0-2.4-2-2.4-2c0,0-2.8-0.5-2.8-0.5c0,0-1.5-1.9-1.5-1.9c0,0-4.1-0.2-4.1-0.2c0,0-1.4,2.7-1.4,2.7c0,0-0.2,1.7-0.2,1.7c0,0-3.7,0.3-3.7,0.3c0,0-3.8-1.4-3.8-1.4c0,0-0.3-3.6-0.3-3.6c0,0,1.7-2,1.7-2c0,0-0.5-3-0.5-3c0,0-2.4-1.4-2.4-1.4c0,0-3.4-0.6-3.4-0.6c0,0-2.5,2.4-2.5,2.4c0,0-3,0-3,0c0,0-3,2-3,2c0,0-0.2,2.9-0.2,2.9c0,0,2.9,1.9,2.9,1.9c0,0,1.5,2.5,1.5,2.5c0,0,0.8,2.2,0.8,2.2c0,0,0.6,2.1,0.6,2.1c0,0-2.1,0.7-2.1,0.7c0,0-2.5-0.5-2.5-0.5c0,0-2.9,2.1-2.9,2.1c0,0-1.6,2.8-1.6,2.8c0,0-2.3,0.2-2.3,0.2c0,0-2.6-1.8-2.6-1.8c0,0-1.6,2.1-1.6,2.1c0,0-1.7-0.3-1.7-0.3c0,0-1-3.4-1-3.4c0,0-1.9-1.4-1.9-1.4c0,0-1-3.4-1-3.4c0,0-2.8-1.4-2.8-1.4c0,0-1.4-3-1.4-3c0,0-1.6-2-1.6-2c0,0-2.6-2.3-2.6-2.3c0,0-2.9,0.7-2.9,0.7c0,0-3.7-2.8-3.7-2.8c0,0-0.6-2.8-0.6-2.8c0,0-3.3-1.9-3.3-1.9c0,0-3,0-3,0c0,0-0.7-3.3-0.7-3.3c0,0-1.6-2.1-1.6-2.1c0,0-0.1-3-0.1-3c0,0,1.8-3.1,1.8-3.1c0,0-3.4-1.3-3.4-1.3c0,0-2.5,1.1-2.5,1.1c0,0-1.2-2.4-1.2-2.4c0,0-0.4-3.1-0.4-3.1c0,0-3.9-1.6-3.9-1.6c0,0,1.2-2.8,1.2-2.8c0,0,2.4-0.7,2.4-0.7c0,0,3.3-0.1,3.3-0.1c0,0,2.3-0.9,2.3-0.9c0,0,2.4-2.4,2.4-2.4c0,0,3.5-0.5,3.5-0.5c0,0,2.9-2,2.9-2c0,0,0.9-3,0.9-3c0,0,2.3-0.8,2.3-0.8c0,0,2.8-0.6,2.8-0.6c0,0,2.5,2.2,2.5,2.2c0,0,2.5,0.1,2.5,0.1c0,0,1.5-2.8,1.5-2.8c0,0,1.6,2.5,1.6,2.5c0,0,3.5,0.5,3.5,0.5c0,0,2.1,5.1,2.1,5.1z"
                                fill="#222"
                                transform="translate(-100, -80) scale(2.2)"
                            />
                            {/* Pulsing Africa Highlight */}
                            <path
                                d="M172.9,119.5c0,0,1.2,4.1,1.2,4.1c0,0,7.6-1.3,7.6-1.3c0,0,7.9,0.9,7.9,0.9c0,0,6.6-1.5,6.6-1.5c0,0,2.3-2.6,2.3-2.6c0,0,2.2,3.8,2.2,3.8c0,0,2.5-0.3,2.5-0.3c0,0,2.3,3.1,2.3,3.1c0,0,4.2,0,4.2,0c0,0-1.2,1.6-1.2,1.6c0,0,2.7,1.5,2.7,1.5c0,0,0.9,4.6,0.9,4.6c0,0,1.8,1.8,1.8,1.8c0,0-0.1,3.4-0.1,3.4c0,0-1.9,1.6-1.9,1.6c0,0,1,1.9,1,1.9c0,0-0.9,2.4-0.9,2.4c0,0,0.8,2.6,0.8,2.6c0,0,3.7-0.7,3.7-0.7c0,0,2.1,2.2,2.1,2.2c0,0,3.4,2.4,3.4,2.4c0,0,1.1,3.5,1.1,3.5c0,0-1.8,3.9-1.8,3.9c0,0-2.3,0.5-2.3,0.5c0,0-2.4-2-2.4-2c0,0-2.8-0.5-2.8-0.5c0,0-1.5-1.9-1.5-1.9c0,0-4.1-0.2-4.1-0.2c0,0-1.4,2.7-1.4,2.7c0,0-0.2,1.7-0.2,1.7c0,0-3.7,0.3-3.7,0.3c0,0-3.8-1.4-3.8-1.4c0,0-0.3-3.6-0.3-3.6c0,0,1.7-2,1.7-2c0,0-0.5-3-0.5-3c0,0-2.4-1.4-2.4-1.4c0,0-3.4-0.6-3.4-0.6c0,0-2.5,2.4-2.5,2.4c0,0-3,0-3,0c0,0-3,2-3,2c0,0-0.2,2.9-0.2,2.9c0,0,2.9,1.9,2.9,1.9c0,0,1.5,2.5,1.5,2.5c0,0,0.8,2.2,0.8,2.2c0,0,0.6,2.1,0.6,2.1c0,0-2.1,0.7-2.1,0.7c0,0-2.5-0.5-2.5-0.5c0,0-2.9,2.1-2.9,2.1c0,0-1.6,2.8-1.6,2.8c0,0-2.3,0.2-2.3,0.2c0,0-2.6-1.8-2.6-1.8c0,0-1.6,2.1-1.6,2.1c0,0-1.7-0.3-1.7-0.3c0,0-1-3.4-1-3.4c0,0-1.9-1.4-1.9-1.4c0,0-1-3.4-1-3.4c0,0-2.8-1.4-2.8-1.4c0,0-1.4-3-1.4-3c0,0-1.6-2-1.6-2c0,0-2.6-2.3-2.6-2.3c0,0-2.9,0.7-2.9,0.7c0,0-3.7-2.8-3.7-2.8c0,0-0.6-2.8-0.6-2.8c0,0-3.3-1.9-3.3-1.9c0,0-3,0-3,0c0,0-0.7-3.3-0.7-3.3c0,0-1.6-2.1-1.6-2.1c0,0-0.1-3-0.1-3c0,0,1.8-3.1,1.8-3.1c0,0-3.4-1.3-3.4-1.3c0,0-2.5,1.1-2.5,1.1c0,0-1.2-2.4-1.2-2.4c0,0-0.4-3.1-0.4-3.1c0,0-3.9-1.6-3.9-1.6c0,0,1.2-2.8,1.2-2.8c0,0,2.4-0.7,2.4-0.7c0,0,3.3-0.1,3.3-0.1c0,0,2.3-0.9,2.3-0.9c0,0,2.4-2.4,2.4-2.4c0,0,3.5-0.5,3.5-0.5c0,0,2.9-2,2.9-2c0,0,0.9-3,0.9-3c0,0,2.3-0.8,2.3-0.8c0,0,2.8-0.6,2.8-0.6c0,0,2.5,2.2,2.5,2.2c0,0,2.5,0.1,2.5,0.1c0,0,1.5-2.8,1.5-2.8c0,0,1.6,2.5,1.6,2.5c0,0,3.5,0.5,3.5,0.5c0,0,2.1,5.1,2.1,5.1z"
                                fill="rgba(252, 209, 42, 0.05)"
                                stroke="#FCD12A"
                                strokeWidth="0.5"
                                className="africa-pulse"
                                transform="translate(-100, -80) scale(2.2)"
                            />
                            {/* Realistic Kenya Shape with Image */}
                            <path
                                d="M179.6,137.9c0,0,2.1,0,2.1,0c0,0-0.1,2.1-0.1,2.1c0,0,1.5,1.6,1.5,1.6c0,0,1.9-0.1,1.9-0.1c0,0-0.1,2.5-0.1,2.5c0,0,1.5,0.8,1.5,0.8c0,0,0,2,0,2c0,0,2,0.4,2,0.4c0,0,0,2,0,2c0,0-2,0.4-2,0.4c0,0-0.5,2.1-0.5,2.1c0,0-2,0-2,0c0,0-2.1,0-2.1,0c0,0,0-2.5,0-2.5c0,0-2.2,0.1-2.2,0.1c0,0,0-2.2,0-2.2c0,0,2.1-1,2.1-1c0,0,0-4.5,0-4.5c0,0-2.1,0-2.1,0c0,0,0-3.7,0-3.7z"
                                fill="url(#kenya-img)"
                                stroke="#FCD12A"
                                strokeWidth="1"
                                className="kenya-shape-pulse"
                                transform="translate(-100, -80) scale(2.2)"
                            />
                            <text x="310" y="240" fill="#FCD12A" fontFamily="Roboto" fontSize="12" fontWeight="700">KENYA</text>
                        </svg>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 overflow-hidden px-4 md:px-0">
                    <Slider {...sliderSettings}>
                        <div>
                            <img src="/kenya-vision.png" alt="Nairobi Skyline - Heart of the Spark" className="w-full h-80 object-cover rounded-xl" loading="lazy" />
                            <p className="text-center text-sm text-[#888] mt-2 italic">Nairobi, Kenya — Heart of the Spark</p>
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&w=600&q=80" alt="Students studying" className="w-full h-80 object-cover rounded-xl" loading="lazy" />
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&w=600&q=80" alt="Graduates networking" className="w-full h-80 object-cover rounded-xl" loading="lazy" />
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&w=600&q=80" alt="Group of influencers" className="w-full h-80 object-cover rounded-xl" loading="lazy" />
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&w=600&q=80" alt="Creative meeting" className="w-full h-80 object-cover rounded-xl" loading="lazy" />
                        </div>
                    </Slider>
                </div>
            </motion.div>
        </section >
    );
};

export default Audience;
