import { ArrowUpRight, Mail } from 'lucide-react';
import { SITE } from '../data/site';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from './BrandIcons';

const ITEMS = [
  { key: 'wa', label: 'WhatsApp Community', note: 'Join our community', href: SITE.whatsapp, icon: WhatsAppIcon, external: true },
  { key: 'waChat', label: 'Reach us on WhatsApp', note: 'Message our team directly', href: SITE.whatsappDirect, icon: WhatsAppIcon, external: true },
  { key: 'ig', label: 'Instagram', note: SITE.instagramHandle, href: SITE.instagram, icon: InstagramIcon, external: true },
  { key: 'fb', label: 'Facebook', note: SITE.facebookHandle, href: SITE.facebook, icon: FacebookIcon, external: true },
  { key: 'yt', label: 'YouTube', note: 'Youth Spark Summit', href: SITE.youtube, icon: YouTubeIcon, external: true },
  { key: 'mail', label: 'Email', note: SITE.email, href: `mailto:${SITE.email}`, icon: Mail },
];

const SocialRow = ({ keys }) => {
  const items = keys ? ITEMS.filter((i) => keys.includes(i.key)) : ITEMS;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const IconComponent = item.icon;
        return (
          <li key={item.key}>
            <a
              href={item.href}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="card group flex min-h-[72px] items-center gap-3.5 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                <IconComponent size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-fg group-hover:text-gold">{item.label}</span>
                <span className="block truncate text-xs text-muted">{item.note}</span>
              </span>
              {item.external && (
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                  aria-hidden="true"
                />
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialRow;
