import { Camera, Mail, MessageCircle, Phone, Play } from 'lucide-react';
import { SITE } from '../data/site';

const ITEMS = [
  { key: 'wa', label: 'WhatsApp', note: 'Join the group', href: SITE.whatsapp, icon: MessageCircle, external: true },
  { key: 'ig', label: 'Instagram', note: SITE.instagramHandle, href: SITE.instagram, icon: Camera, external: true },
  { key: 'yt', label: 'YouTube', note: 'Watch past gatherings', href: SITE.youtube, icon: Play, external: true },
  { key: 'tel', label: 'Call', note: SITE.phone, href: SITE.phoneHref, icon: Phone },
  { key: 'mail', label: 'Email', note: SITE.email, href: `mailto:${SITE.email}`, icon: Mail },
];

const SocialRow = ({ keys }) => {
  const items = keys ? ITEMS.filter((i) => keys.includes(i.key)) : ITEMS;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => {
        const IconComponent = item.icon;
        return (
          <li key={item.key}>
            <a
              href={item.href}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="card flex min-h-[64px] items-center gap-3 p-4 transition-colors hover:border-gold"
            >
              <IconComponent size={22} className="shrink-0 text-gold" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="block truncate text-xs text-muted">{item.note}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialRow;
