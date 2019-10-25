import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import CarouselCaption from 'react-bootstrap/CarouselCaption'
import CarouselItem from 'react-bootstrap/CarouselItem'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Testimonials() {
  return(
    <div>
      <Carousel>
        <CarouselItem style={{ height: '640px' }}>
          <img
            className="d-block w-100"
            src="https://placebear.com/640/360"
            alt="First slide"
          />
          <CarouselCaption style={{ top: '0' }}>
            <Col>
              <div style={{ paddingTop: "100px" }}>
                <h1 style={{ fontWeight: "700", textAlign: 'center' }}>
                  What people say about our flood risk intelligence.
                </h1>
              </div>
              <hr style={{ border: "1px solid rgb(85, 185, 106)" }} />
              <div>
                <p style={{ fontSize: '20px' }}>I cannot thank you enough for this, it gives me great relief of mind that my wife and I choose the right place. Thank you!</p>
                <p style={{ fontSize: '20px' }}>I cannot thank you enough for this, it gives me great relief of mind that my wife and I choose the right place. Thank you!</p>
                <p style={{ fontSize: '20px' }}>T Weisman</p>
                <p style={{ fontSize: '20px' }}>St Petersburg FL</p>
              </div>
            </Col>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem style={{ height: '640px' }}>
          <img
            className="d-block w-100"
            src="https://loremflickr.com/640/360"
            alt="Third slide"
          />
          <CarouselCaption style={{ top: '0' }}>
            <Col>
              <div style={{ paddingTop: "100px" }}>
                <h1 style={{ fontWeight: "700", textAlign: 'center' }}>
                  What people say about our flood risk intelligence.
                </h1>
              </div>
              <hr style={{ border: "1px solid rgb(85, 185, 106)" }} />
              <div>
                <p style={{ fontSize: '20px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit
                  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <p style={{ fontSize: '20px' }}>T Weisman</p>
                <p style={{ fontSize: '20px' }}>Tampa, FL</p>
              </div>
            </Col>
          </CarouselCaption>
        </CarouselItem>
      </Carousel>
    </div>
  )
}