import styles from './MainSlider.module.css'
import image1 from './../../assets/slider-image-1.jpeg'
import image2 from './../../assets/slider-image-2.jpeg'
import image3 from './../../assets/slider-image-3.jpeg'
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000
};

export default function MainSlider() {
  return (


    <div className="flex flex-wrap">
      <div className="w-full">
        <Slider {...settings}>
          <div>
            <img src={image1} className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]" alt="MainSliderImage 1" />
          </div>
          <div>
            <img src={image2} className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]" alt="MainSliderImage 2" />
          </div>
          <div>
            <img src={image3} className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]" alt="MainSliderImage 3" />
          </div>
        </Slider>
      </div>
    </div>



  )
}
