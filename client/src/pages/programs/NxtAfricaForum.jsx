import { Helmet } from 'react-helmet';
import ImageGrid from '../../components/ImageGrid';

const NxtAfricaForum = () => {
    const slides = ['/NXT Poster.webp','/NXT 5.webp','/NXT 2.webp','/NXT 1.webp','/NXT4.webp','/NXT 3.webp','/NXT 6.webp','/NXT 7.webp','/NXT 8.webp'];

    return (
        <div className="page-top-spacing">
            <Helmet>
                <title>NXT Africa Forum | Youth Spark Nexus</title>
            </Helmet>

            <div className="max-w-screen-xl mx-auto px-4">
                <h1 className="text-4xl text-[#FCD12A] font-bold mb-4">NXT Africa Forum</h1>

                <section className="mt-2">
                    <h3 className="text-xl text-[#FCD12A] mb-2">Overview</h3>
                    <p className="text-[#BFBFBF]">An intimate forum convening influential voices from business, technology, finance, leadership, and the creative economy to deliver practical insights, real-world strategies, and catalytic conversations for scalable ventures.</p>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl text-[#FCD12A] mb-4">Photo Gallery</h3>
                    <ImageGrid images={slides} />
                </section>
            </div>
        </div>
    );
};

export default NxtAfricaForum;
