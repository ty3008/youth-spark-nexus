import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import ImageGrid from '../../components/ImageGrid';

const YouthSparkNexus = () => {
    const slides = ['/Nexus 3.jpg','/Nexus 2.jpg','/Nexus.jpg','/Nexus 4.webp','/Nexus 5.webp','/Nexus 6.jpg','/Nexus 7.jpg','/Nexus 8.jpg','/Nexus 9.jpg','/Nexus 10.jpg'];
    const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, arrows: true };

    return (
        <div className="page-top-spacing">
            <Helmet>
                <title>Youth Spark Nexus | Youth Spark Nexus</title>
            </Helmet>

            <div className="max-w-screen-xl mx-auto px-4">
                <h1 className="text-4xl text-[#FCD12A] font-bold mb-4">Youth Spark Nexus</h1>

                <section className="mt-2">
                    <h3 className="text-xl text-[#FCD12A] mb-2">Overview</h3>
                    <p className="text-[#BFBFBF]">Monthly discipleship and leadership sessions at Nairobi CBD, featuring word, worship, and group discussions for 100+ participants. Build community and grow in faith. </p>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl text-[#FCD12A] mb-4">Photo Gallery</h3>
                    <ImageGrid images={slides} />
                </section>
            </div>
        </div>
    );
};

export default YouthSparkNexus;
