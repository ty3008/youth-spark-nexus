import { Helmet } from 'react-helmet';
import { SITE } from '../data/site';
import { PageHeader } from '../components/PageParts';
import SocialRow from '../components/SocialRow';

const Contact = () => (
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
        <p className="mt-8 text-sm text-muted">{SITE.noRegistrationLine}</p>
      </div>
    </section>
  </>
);

export default Contact;
