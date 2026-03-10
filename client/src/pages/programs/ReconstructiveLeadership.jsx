import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import ImageGrid from '../../components/ImageGrid';

const ReconstructiveLeadership = () => {
    const slides = ['/Hangout1.jpg','/Hangout 2.jpg','/Hangout 3.jpg'];
    const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, arrows: true };

    return (
        <div className="pt-20">
            <Helmet>
                <title>Reconstructive Leadership | Youth Spark Nexus</title>
            </Helmet>

            <div className="max-w-screen-xl mx-auto px-4">
                <h1 className="text-4xl text-[#FCD12A] font-bold mb-4">Reconstructive Leadership</h1>

                <section className="mt-2">
                    <h3 className="text-xl text-[#FCD12A] mb-2">Overview</h3>
                    <p className="text-[#BFBFBF]">A 3-month structured program designed to rebuild and equip young leaders with practical, monetizable skills. Through deep learning, hands-on projects, and sessions with skilled guest experts, participants gain ethical leadership tools to generate income and transform their industries. Cohorts run quarterly, focusing on real-world application in a supportive environment.</p>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl text-[#FCD12A] mb-4">Photo Gallery</h3>
                    <ImageGrid images={slides} />
                </section>
            </div>
        </div>
    );
};

export default ReconstructiveLeadership;
