import Carousel from 'react-bootstrap/Carousel';

function CarouselFadeExample() {
    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="..\src\assets\thunderbolts.jpg"
                    alt="First slide"
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="..\src\assets\106611.jpg"
                    alt="First slide"
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="..\src\assets\maxresdefault.jpg"
                    alt="First slide"
                />

            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselFadeExample;