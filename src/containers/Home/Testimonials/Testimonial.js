import React from 'react'
import CarouselItem from 'react-bootstrap/CarouselItem'
import CarouselCaption from 'react-bootstrap/CarouselCaption'
import './Testimonials.css'

export default function Testimonial(props) {
  return (
    <CarouselItem className="carousel-item">
      <CarouselCaption className="carousel-caption">
        <div>
          <div className="carousel-caption-header">
            <p>What people say about our flood risk intelligence.</p>
          </div>
          <hr style={{ border: "1px solid rgb(85, 185, 106)" }} />
          <div className="carousel-caption-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
                </p>
          </div>
          <div className="carousel-caption-footer">
            <p className="testimonial-author">C Karunas</p>
            <p>Tampa, FL</p>
          </div>
        </div>
      </CarouselCaption>
    </CarouselItem>
  )
}