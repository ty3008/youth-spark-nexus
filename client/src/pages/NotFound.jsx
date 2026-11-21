import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => (
  <section className="wrap section">
    <Helmet>
      <title>Page not found — Youth Spark Summit</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <p className="eyebrow mb-3">404</p>
    <h1 className="text-3xl sm:text-4xl">We could not find that page</h1>
    <p className="lead mt-4 max-w-xl">The address may have moved. Browse our gatherings page to explore our events and archive.</p>
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Link to="/events" className="btn-gold">See all gatherings</Link>
      <Link to="/" className="btn-ghost">Go home</Link>
    </div>
  </section>
);

export default NotFound;
