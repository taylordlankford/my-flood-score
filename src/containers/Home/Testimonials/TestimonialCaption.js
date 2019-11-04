import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import CarouselItem from 'react-bootstrap/CarouselItem'

export default function TestimonialCaption(props) {
  return(
    <Carousel className="carousel-container" nextIcon={props.nextIcon} prevIcon={props.prevIcon}>
      {
        props.testimonialList.map((element, key) => {
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
  )
}
