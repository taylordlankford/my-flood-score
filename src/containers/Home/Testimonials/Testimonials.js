import React, { useState } from 'react'
import { Parallax, Background } from 'react-parallax';
import Carousel from 'react-bootstrap/Carousel'
import CarouselCaption from 'react-bootstrap/CarouselCaption'
import CarouselItem from 'react-bootstrap/CarouselItem'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Testimonials.css'
import TestimonialImage from '../../../../src/assets/images/testimonial-image.jpg'
import Testimonial from './Testimonial'
import { FaChevronRight } from 'react-icons/fa'
import { FaChevronLeft } from 'react-icons/fa'

export default function Testimonials() {
  // const [nextIcon, setNextIcon] = useState(<span aria-hidden="true" className="carousel-control-next-icon" />)
  const [prevIcon, setPrevIcon] = useState(<FaChevronLeft />)
  const [nextIcon, setNextIcon] = useState(<FaChevronRight />)
  const [testimonialTitle] = useState('What people say about our flood risk intelligence.')
  const [testimonialList] = useState([
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
    <Parallax
      contentClassName="parallax-content"
      bgImage={TestimonialImage}
      bgImageAlt="testimonial-image"
      strength={1000}
    >
      <div className="carousel-wrapper">
        <div className="carousel-caption-header">
          <div>{testimonialTitle}</div>
          <hr className="testimonial-separator" />
        </div>
        <Carousel className="carousel-container" nextIcon={nextIcon} prevIcon={prevIcon}>
          {
            testimonialList.map((element, key) => {
              return (
                <CarouselItem key={key}>
                  <div className="carousel-item-container">
                    <div className="carousel-caption-body">
                      {element.body}
                    </div>
                    <div className="carousel-caption-footer">
                      <div className="testimonial-author">
                        {element.author}
                      </div>
                      {element.location}
                    </div>
                  </div>
                </CarouselItem>
              )
            })
          }
        </Carousel>
      </div>
    </Parallax>
  )
}
