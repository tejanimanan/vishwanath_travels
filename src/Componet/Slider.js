import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/mountain-1.jpg",
  "/mastang-1.jpg",
  "/miltary-3.jpg",
  "/miltary-3.jpg",
  "/miltary-3.jpg",
  "/miltary-3.jpg"
];

export default function ImageSlider() {


  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" >
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3} aria-label="Slide 4" />
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={4} aria-label="Slide 5" />
      </div>
      <div className="carousel-inner" style={{height:"500px"}}>
        <div className="carousel-item active" >
          <img src="/collage2.jpg" className="d-block w-100 h-100 object-fit-cover" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/collage1.jpg" className="d-block w-100 object-fit-cover" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/collage10.jpg" className="d-block w-100 object-fit-cover" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/collage9.jpg" className="d-block w-100 object-fit-cover" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/collage8.jpg" className="w-100 img-fulid object-fit-cover" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>

  );
}
