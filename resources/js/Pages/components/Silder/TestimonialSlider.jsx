import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";


const CustomNextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow`}
    style={{
      ...style,
      display: "flex",
      background: "black",
      color: "white",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    &#x27A1;
  </div>
);

const CustomPrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow`}
    style={{
      ...style,
      display: "flex",
      background: "black",
      color: "white",
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    &#x27A0;
  </div>
);

const testimonials = [
  {
    id: 1,
    name: "Ahmed Ali",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    profilePic: "https://via.placeholder.com/40",
    socialIcon: "https://via.placeholder.com/20"
  },
  {
    id: 2,
    name: "Ahmed Ali",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    profilePic: "https://via.placeholder.com/40",
    socialIcon: "https://via.placeholder.com/20"
  },
  {
    id: 3,
    name: "Ahmed Ali",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    profilePic: "https://via.placeholder.com/40",
    socialIcon: "https://via.placeholder.com/20"
  },
  {
    id: 4,
    name: "Ahmed Ali",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    profilePic: "https://via.placeholder.com/40",
    socialIcon: "https://via.placeholder.com/20"
  }
];

export default function TestimonialSlider() {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    appendDots: dots => (
      <div style={{ borderRadius: "10px", padding: "0px" }}>
        <ul style={{ margin: "0" , padding:"0", display: "flex", justifyContent: "center", alignItems: "center", gap: "50px" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: i => (
      <div
        className="custom-dot"
        style={{
          width: "70px",
          height: "5px",
          borderRadius: "25px",
          display: "inline-block",
          margin: "10px",
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div className=" my-10 text-center p-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('testimonialSlider.title')}</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="px-4 flex justify-center items-center">
            <div className="border md:w-[400px] w-full md:h-[350px] h-full rounded-xl items-start p-6 flex justify-center flex-col gap-5">
              <div className="flex items-center mb-4">
                <img src={testimonial.profilePic} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                <img src={testimonial.socialIcon} alt="Social Icon" className="w-5 h-5" />
              </div>
              <p className="text-gray-600 text-left">{testimonial.review}</p>
              <p className="mt-4 text-[#577260] font-semibold text-left">- {testimonial.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
