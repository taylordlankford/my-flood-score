import React from 'react'

export default function TestimonialTitle(props) {
  return(
    <div className="carousel-caption-header">
      <div>{props.testimonialTitle}</div>
      <hr className="testimonial-separator" />
    </div>
  )
}
