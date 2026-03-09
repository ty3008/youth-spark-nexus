import './Hero.css';
import { motion } from 'framer-motion';

const Hero = () => {
    const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

    return (
        <section id="hero">
            <motion.div
                className="max-w-screen-xl mx-auto flex flex-col items-center justify-center text-center px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                <h1>Empowering a Generation,<br />Discipling Nations</h1>
                <p>Igniting a movement of Kingdom-minded youth shaping Africa's future.</p>
                <a href="#join-us" className="btn mt-6">Join the Movement</a>
            </motion.div>
        </section>
    );
};

export default Hero;
