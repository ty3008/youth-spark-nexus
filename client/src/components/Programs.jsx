import { useState } from 'react';
import { motion } from 'framer-motion';
import './Programs.css';

const Programs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion(index);
        }
    };

    const programs = [
        { title: '1. Youth Spark Summit', content: 'Annual worship, word, and leadership development summit bringing together thousands of youth to ignite passion and purpose.' },
        { title: '2. Youth Spark Nexus', content: 'Monthly discipleship & leadership sessions for continued growth, networking, and deeper biblical foundation building.' },
        { title: '3. Campus Tours', content: 'Masterclasses & mentorship reaching across Kenya\'s top universities, bringing leadership training directly to students.' },
        { title: '4. NXT Africa Forum', content: 'The Forum convenes influential voices from business, technology, finance, leadership, and the creative economy to deliver practical insights, real-world strategies, and catalytic conversations that help young people build scalable ventures and systems-level solutions.' }
    ];

    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    return (
        <section id="programs" className="section-padding bg-[#0d0d0d]">
            <motion.div
                className="max-w-screen-xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                <h2>Programs Overview</h2>
                <p className="mb-6 text-[#BFBFBF]">Click to expand each program and learn more.</p>
                <div className="programs-list">
                    {programs.map((program, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div key={index} className="program-bar">
                                <div
                                    className="program-header"
                                    tabIndex="0"
                                    aria-expanded={isActive}
                                    role="button"
                                    onClick={() => toggleAccordion(index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                >
                                    <h3>{program.title}</h3>
                                    <span>{isActive ? '-' : '+'}</span>
                                </div>
                                <div className={`program-content ${isActive ? 'active' : ''}`}>
                                    <p>{program.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
};

export default Programs;
