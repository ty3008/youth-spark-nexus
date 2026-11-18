import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Thumbnail grid that opens a lightbox with previous, next and close.
// Images load lazily. Nothing is written over the photographs.
const Gallery = ({ images = [], alt = 'Gathering photo', caption }) => {
  const [index, setIndex] = useState(null);
  const closeRef = useRef(null);
  const lastTrigger = useRef(null);
  const touchStartX = useRef(null);

  const open = (i, el) => {
    lastTrigger.current = el;
    setIndex(i);
  };
  const close = () => {
    setIndex(null);
    lastTrigger.current?.focus();
  };
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
  };

  useEffect(() => {
    if (index === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIndex(null);
        lastTrigger.current?.focus();
      } else if (e.key === 'ArrowRight') {
        setIndex((i) => (i + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setIndex((i) => (i - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [index, images.length]);

  if (!images.length) return null;

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="block aspect-[4/3] w-full overflow-hidden rounded-lg bg-panel"
              aria-label={`Open photo ${i + 1} of ${images.length}`}
            >
              <img
                src={src}
                alt={`${alt}, photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>
      {caption && <p className="mt-3 text-sm text-muted">{caption}</p>}

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-2 text-sm text-muted" onClick={(e) => e.stopPropagation()}>
            <span>
              {index + 1} / {images.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-fg hover:text-gold"
            >
              <X size={26} />
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center px-2 sm:px-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[index]}
              alt={`${alt}, photo ${index + 1}`}
              className="max-h-full max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="flex items-center justify-center gap-4 px-4 py-3" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={prev} aria-label="Previous photo" className="btn-ghost w-28">
              <ChevronLeft size={20} /> Prev
            </button>
            <button type="button" onClick={next} aria-label="Next photo" className="btn-ghost w-28">
              Next <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
