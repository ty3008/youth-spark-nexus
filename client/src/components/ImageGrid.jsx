import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGrid = ({ images = [] }) => {
    const [index, setIndex] = useState(null);

    const open = (i) => setIndex(i);
    const close = () => setIndex(null);
    const next = () => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    const prev = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    useEffect(() => {
        if (index === null) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKey = (e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
        };
    }, [index]);

    return (
        <div>
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {images.map((src, i) => (
                    <motion.button
                        key={i}
                        type="button"
                        onClick={() => open(i)}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="group relative overflow-hidden rounded-2xl glass-card aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    >
                        <img 
                            src={src} 
                            alt={`Youth Spark archive photo ${i + 1}`} 
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-brand-gold/90 text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                                <Maximize2 size={18} />
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {index !== null && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8" 
                        onClick={close}
                    >
                        <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center">
                            {/* Top Bar with Counter and Close */}
                            <div className="w-full flex items-center justify-between pb-4 text-white">
                                <span className="text-xs uppercase tracking-widest text-brand-gold font-mono font-bold">
                                    Photo {index + 1} of {images.length}
                                </span>
                                <button 
                                    onClick={close} 
                                    aria-label="Close gallery" 
                                    className="p-2.5 rounded-full bg-white/10 text-white hover:bg-brand-gold hover:text-black transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Main Active Image */}
                            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl">
                                <motion.img 
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    src={images[index]} 
                                    alt={`High-resolution view ${index + 1}`} 
                                    className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl" 
                                />
                            </div>

                            {/* Controls */}
                            <button 
                                onClick={prev} 
                                aria-label="Previous image" 
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 text-white border border-white/10 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-all backdrop-blur-md"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={next} 
                                aria-label="Next image" 
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 text-white border border-white/10 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-all backdrop-blur-md"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageGrid;
