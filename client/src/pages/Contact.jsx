import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Check, Copy } from 'lucide-react';
import { SITE } from '../data/site';
import { PageHeader } from '../components/PageParts';
import SocialRow from '../components/SocialRow';

const Contact = () => {
  const [copied, setCopied] = useState('');

  const copy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    } catch {
      /* ignore clipboard error */
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact — Youth Spark Summit</title>
        <meta
          name="description"
          content="Contact Youth Spark Summit in Nairobi by phone, email, WhatsApp, Instagram, or YouTube."
        />
      </Helmet>

      <PageHeader crumbs={[{ label: 'Contact' }]} eyebrow="Contact" title="Reach us">
        <p className="lead">We are based in Nairobi. Call or email, or join the WhatsApp group.</p>
      </PageHeader>

      <section className="section">
        <div className="wrap">
          <SocialRow />

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => copy('email', SITE.email)} className="btn-ghost text-xs">
              {copied === 'email' ? <Check size={16} className="text-gold" /> : <Copy size={16} />}
              {copied === 'email' ? 'Copied email' : `Copy ${SITE.email}`}
            </button>
            <button type="button" onClick={() => copy('phone', SITE.phone)} className="btn-ghost text-xs">
              {copied === 'phone' ? <Check size={16} className="text-gold" /> : <Copy size={16} />}
              {copied === 'phone' ? 'Copied phone' : `Copy ${SITE.phone}`}
            </button>
          </div>

          <p className="mt-8 text-sm text-muted">{SITE.noRegistrationLine}</p>
        </div>
      </section>
    </>
  );
};

export default Contact;
