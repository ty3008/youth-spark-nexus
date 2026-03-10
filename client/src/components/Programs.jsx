
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
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

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false
    };

    return (
        <section id="programs" className="section-padding bg-[#0d0d0d]">
            <motion.div
                className="max-w-screen-xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                <h2 className="text-4xl font-bold text-[#FCD12A] mb-4">Our Programs</h2>
                <p className="mb-10 text-[#BFBFBF] text-lg max-w-2xl">Discover our Kingdom-centered programs designed to equip and empower young leaders across Africa.</p>
                <div className="flex flex-col gap-8">
                    {programs.map((program, idx) => (
                        <div key={program.name} className="bg-[#1F1F1F] rounded-xl shadow-lg p-4 flex flex-col md:flex-row gap-4 items-stretch">
                            <div className="w-full md:w-1/3 aspect-square overflow-hidden rounded-xl">
                                <Slider {...sliderSettings}>
                                    {program.images.map((img, i) => (
                                        <div key={i} className="h-full flex items-center">
                                            <img src={img} alt={program.name + ' photo ' + (i+1)} className="w-full h-full object-cover" loading="lazy" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="w-full md:w-2/3 flex flex-col justify-center gap-3 p-2">
                                <RouterLink to={program.link} className="text-2xl font-bold text-[#FCD12A] hover:underline hover:text-white transition-colors w-fit">{program.name}</RouterLink>
                                <p className="text-[#BFBFBF] text-base">{program.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Programs;
