import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import CarouselCaption from 'react-bootstrap/CarouselCaption'
import CarouselItem from 'react-bootstrap/CarouselItem'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Testimonials.css'

export default function Testimonials() {
  const [nextIcon, setNextIcon] = useState(<span aria-hidden="true" className="carousel-control-next-icon" />)
  const [prevIcon, setPrevIcon] = useState(<span aria-hidden="true" className="carousel-control-prev-icon" />)
  const [testimonialTitle, setTestimonialTitle] = useState('What people say about our flood risk intelligence.')
  const [testimonials, setTestimonials] = useState([
    {
      body: "I'm a Realtor and I like what you're doing. I think this is a huge benefit to those clients who have already made a decision to purchase a property within a floodzone. Being able to give my buyer's a detailed report like this is definitely an added value service I can provide for them. Good job guys!!!",
      author: "M S Rivard",
      location: "Tampa FL"
    },
    {
      body: "I cannot thank you enough for this, it gives me great relief of mind that my wife and I chose the right place. Thank you!",
      author: "T Weisman",
      location: "St Petersburg FL"
    },
    {
      body: "We thank you for your ingenuity and foresight to help with a necessary evil that has become very cloudy over the years... and it is refreshing to hear someone put clarity and direction on this topic.",
      author: "R L Hord",
      location: "Sarasota FL"
    }
  ])

  return (
    <Carousel className="carousel" nextIcon={nextIcon} prevIcon={prevIcon}>
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