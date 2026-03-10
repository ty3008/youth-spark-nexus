import { useState, useEffect } from 'react';

const ImageGrid = ({ images = [] }) => {
    const [index, setIndex] = useState(null);

    const open = (i) => setIndex(i);
    const close = () => setIndex(null);
    const next = () => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    const prev = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    useEffect(() => {
        if (index === null) return;
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [index]);

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((src, i) => (
                    <button key={i} onClick={() => open(i)} className="overflow-hidden rounded-lg block focus:outline-none">
                        <img src={src} alt={`img-${i}`} className="w-full h-36 md:h-40 object-cover hover:scale-105 transition-transform" />
                    </button>
                ))}
            </div>

            {index !== null && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4" onClick={close}>
                    <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl z-50">
                        <button onClick={close} aria-label="Close gallery" className="absolute top-4 right-4 text-white text-2xl bg-black/60 hover:bg-black/70 p-4 rounded-full z-60 pointer-events-auto focus:outline-none">✕</button>
                        <button onClick={prev} aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl z-60 pointer-events-auto">‹</button>
                        <img src={images[index]} alt={`large-${index}`} className="w-full h-[70vh] object-contain mx-auto" />
                        <button onClick={next} aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl z-60 pointer-events-auto">›</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGrid;
