
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { getStandardSliderSettings } from '../constants/slickSettings';
import './Programs.css';

const Programs = () => {

    const programs = [
        {
            name: 'Youth Spark Summit',
            link: '/programs/youth-spark-summit',
            overview: 'Our annual flagship event bringing together over 1,500 young leaders for worship, word, and leadership development. Key topics include Kingdom Leadership, Career Workshops, Wealth Creation Purpose, and Innovation.',
            images: [
                '/YSS 2025 Poster.jpg',
                '/YSS 2025.jpg',
                '/YSS 6.jpg'
            ]
        },
        {
            name: 'Youth Spark Nexus',
            link: '/programs/youth-spark-nexus',
            overview: 'Monthly discipleship and leadership sessions at Nairobi CBD, featuring word, worship, and group discussions for 100+ participants. Build community and grow in faith.',
            images: [
                '/Nexus 3.jpg',
                '/Nexus 2.jpg',
                '/Nexus.jpg'
            ]
        },
        {
            name: 'NXT Africa Forum',
            link: '/programs/nxt-africa-forum',
            overview: 'An intimate forum convening influential voices from business, technology, finance, leadership, and the creative economy to deliver practical insights, real-world strategies, and catalytic conversations for scalable ventures.',
            images: [
                '/NXT Poster.webp',
                '/NXT 5.webp',
                '/NXT 2.webp'
            ]
        },
        {
            name: 'Reconstructive Leadership',
            link: '/programs/reconstructive-leadership',
            overview: 'A 3-month structured program designed to rebuild and equip young leaders with practical, monetizable skills. Through deep learning, hands-on projects, and sessions with skilled guest experts, participants gain ethical leadership tools to generate income and transform their industries. Cohorts run quarterly, focusing on real-world application in a supportive environment.',
            images: [
                '/Hangout1.jpg',
                '/Hangout 2.jpg',
                '/Hangout 3.jpg'
            ]
        }
    ];

    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    const sliderSettings = getStandardSliderSettings({
        autoplay: true,
        autoplaySpeed: 4500,
    });

    return (
        <section id="programs" className="section-padding bg-[#0d0d0d]">
            <motion.div
                className="max-w-screen-xl mx-auto px-4 sm:px-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-[#FCD12A] mb-4">Our Programs</h2>
                <p className="mb-10 text-[#BFBFBF] text-base sm:text-lg max-w-2xl">Discover our Kingdom-centered programs designed to equip and empower young leaders across Africa.</p>
                <div className="flex flex-col gap-10 md:gap-8">
                    {programs.map((program) => (
                        <div
                            key={program.name}
                            className="bg-[#1F1F1F] rounded-xl shadow-lg p-5 sm:p-6 flex flex-col md:flex-row gap-5 md:gap-4 items-stretch md:min-h-0"
                        >
                            <div className="md:hidden w-full rounded-xl overflow-hidden border border-white/10 aspect-[16/10] shrink-0">
                                <img
                                    src={program.images[0]}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="hidden md:block w-full md:w-1/3 md:aspect-square overflow-hidden rounded-xl programs-gallery-slider">
                                <Slider {...sliderSettings}>
                                    {program.images.map((img, i) => (
                                        <div key={i} className="!flex h-full min-h-[200px] md:min-h-[240px] items-center justify-center bg-black/40">
                                            <img src={img} alt={`${program.name} photo ${i + 1}`} className="w-full h-full min-h-[200px] md:min-h-0 object-cover" loading="lazy" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="w-full md:w-2/3 flex flex-col justify-center gap-4 md:gap-3 py-1 md:p-2 min-h-[10rem]">
                                <RouterLink
                                    to={program.link}
                                    className="text-2xl sm:text-3xl font-bold text-[#FCD12A] hover:text-white transition-colors w-full md:w-fit min-h-[48px] inline-flex items-center border-b-2 border-[#FCD12A]/45 pb-2 md:border-transparent md:pb-0"
                                >
                                    {program.name}
                                </RouterLink>
                                <p className="text-[#BFBFBF] text-base leading-relaxed">{program.overview}</p>
                                <RouterLink
                                    to={program.link}
                                    className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#FCD12A] hover:text-white min-h-[44px] inline-flex items-center"
                                >
                                    View program details →
                                </RouterLink>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Programs;
