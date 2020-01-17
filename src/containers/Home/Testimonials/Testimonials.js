import React, { useState } from 'react'

// React Bootstrap imports
import { Parallax } from 'react-parallax';

// Assets
import './Testimonials.css'
import TestimonialImage from '../../../../src/assets/images/testimonial-image.jpg'
import { FaChevronRight } from 'react-icons/fa'
import { FaChevronLeft } from 'react-icons/fa'

// Children Components
import TestimonialTitle from './TestimonialTitle'
import TestimonialCaption from './TestimonialCaption'

export default function Testimonials(props) {
  const { testimonialTitle, testimonialList } = props
  const [prevIcon]         = useState(<FaChevronLeft />)
  const [nextIcon]         = useState(<FaChevronRight />)

  return (
    <Parallax
      contentClassName="parallax-content"
      bgImage={TestimonialImage}
      bgImageAlt="testimonial-image"
      strength={500}>
      <div className="carousel-wrapper">
        <TestimonialTitle testimonialTitle={testimonialTitle} />
        <TestimonialCaption
          testimonialList={testimonialList}
          prevIcon={prevIcon}
          nextIcon={nextIcon} />
      </div>
    </Parallax>
  )
}
