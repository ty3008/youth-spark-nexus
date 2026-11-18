import { useEffect, useRef } from 'react';
import { ExternalLink, X } from 'lucide-react';

function youtubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    return u.searchParams.get('v');
  } catch {
    return null;
  }
}

// Dark inline film player. Closes on Escape or backdrop click and offers a direct YouTube link if the embed fails.
const VideoModal = ({ video, onClose }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!video) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [video, onClose]);

  if (!video) return null;
  const id = youtubeId(video.url);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.label || 'Gathering film'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl overflow-hidden rounded-xl border border-white/15 bg-ink shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
          <p className="truncate text-sm font-medium text-fg sm:text-base">{video.label || 'Gathering film'}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-fg hover:text-gold"
          >
            <X size={24} />
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          {id ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={video.label || 'Gathering film'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted">
              Video preview unavailable here. Use the YouTube link below.
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
          <span className="text-xs text-muted">If the player does not load, open the film directly.</span>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !min-h-[44px] !px-4 !py-2 text-xs"
          >
            Open on YouTube <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
