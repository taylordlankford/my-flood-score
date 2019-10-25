import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import CarouselCaption from 'react-bootstrap/CarouselCaption'
import CarouselItem from 'react-bootstrap/CarouselItem'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Testimonials.css'

export default function Testimonials() {
  return (
    <Carousel className="carousel">
      <CarouselItem className="carousel-item">
        <img
          className="d-block w-100"
          // src="https://placebear.com/640/360"
          alt=""
        />
        <CarouselCaption className="carousel-caption">
          <div>
            <div className="carousel-caption-header">
              What people say about our flood risk intelligence.
              </div>
            <hr style={{ border: "1px solid rgb(85, 185, 106)" }} />
            <div className="carousel-caption-body">
              <p>
                I cannot thank you enough for this, it gives me great relief of mind that my wife and I choose the right place. Thank you!
                </p>
            </div>
            <div className="carousel-caption-footer">
              <p className="testimonial-author">C Karunas</p>
              <p>Tampa, FL</p>
            </div>
          </div>
        </CarouselCaption>
      </CarouselItem>

      <CarouselItem className="carousel-item">
        <img
          className="d-block w-100"
          // src="https://loremflickr.com/640/360"
          alt=""
        />
        <CarouselCaption className="carousel-caption">
          <div>
            <div className="carousel-caption-header">
              What people say about our flood risk intelligence.
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
    </Carousel>
  )
}