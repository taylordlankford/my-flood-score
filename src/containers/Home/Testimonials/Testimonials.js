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

// Data
import { TESTIMONIAL_TITLE, TESTIMONIAL_LIST } from './TestimonialData'

export default function Testimonials() {
  const [prevIcon]         = useState(<FaChevronLeft />)
  const [nextIcon]         = useState(<FaChevronRight />)
  const [testimonialTitle] = useState(TESTIMONIAL_TITLE)
  const [testimonialList]  = useState(TESTIMONIAL_LIST)

  return (
    <Parallax
      contentClassName="parallax-content"
      bgImage={TestimonialImage}
      bgImageAlt="testimonial-image"
      strength={1000}>
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
