import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Check, Copy } from 'lucide-react';
import { SITE } from '../data/site';
import { PageHeader } from '../components/PageParts';
import SocialRow from '../components/SocialRow';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
          content="Reach Youth Spark Summit in Nairobi directly via WhatsApp, email, Instagram, Facebook, or YouTube."
        />
      </Helmet>

      <PageHeader crumbs={[{ label: 'Contact' }]} eyebrow="Contact" title="Reach us">
        <p className="lead">We are based in Nairobi. Message us directly on WhatsApp, send an email, or follow our channels.</p>
      </PageHeader>

      <section className="section">
        <div className="wrap">
          <SocialRow />

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={copyEmail} className="btn-ghost text-xs">
              {copied ? <Check size={16} className="text-gold" /> : <Copy size={16} />}
              {copied ? 'Copied email' : `Copy ${SITE.email}`}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
