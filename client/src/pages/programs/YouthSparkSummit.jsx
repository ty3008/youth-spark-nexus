import { Helmet } from 'react-helmet';
import ImageGrid from '../../components/ImageGrid';

const YouthSparkSummit = () => {
    const slides = ['/YSS 2025 Poster.jpg','/YSS 2025.jpg','/YSS 3.jpg','/YSS 4.jpg','/YSS 5.jpg','/YSS 6.jpg','/YSS 7.jpg','/YSS 8.jpg','/YSS 9.jpg','/YSS 10.jpg'];

    return (
        <div className="page-top-spacing">
            <Helmet>
                <title>Youth Spark Summit | Youth Spark Nexus</title>
            </Helmet>

            <div className="max-w-screen-xl mx-auto px-4">
                <h1 className="text-4xl text-[#FCD12A] font-bold mb-4">Youth Spark Summit</h1>

                <section className="mt-2">
                    <h3 className="text-xl text-[#FCD12A] mb-2">Overview</h3>
                    <p className="text-[#BFBFBF]">Our annual flagship event bringing together over 1,500 young leaders for worship, word, and leadership development. Key topics include Kingdom Leadership, Career Workshops, Wealth Creation Purpose, and Innovation.</p>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl text-[#FCD12A] mb-4">Photo Gallery</h3>
                    <ImageGrid images={slides} />
                </section>
            </div>
        </div>
    );
};

export default YouthSparkSummit;
