import React from 'react'
import styled from 'styled-components'

import SocialMediaButton from '../../components/SocialMediaButton/SocialMediaButton'
import MFS_Logo from '../../assets/images/MFS_Logo.png'

import twitter_gray from '../../assets/images/social/twitter_gray.svg'
import twitter_white from '../../assets/images/social/twitter_white.svg'
import twitter_background from '../../assets/images/social/twitter-background.jpg'

import facebook_gray from '../../assets/images/social/facebook_gray.svg'
import facebook_white from '../../assets/images/social/facebook_white.svg'
import facebook_background from '../../assets/images/social/facebook-background.jpg'

import insta_gray from '../../assets/images/social/insta_gray.svg'
import insta_white from '../../assets/images/social/insta_white.svg'
import insta_background from '../../assets/images/social/instagram-background.jpg'

const Footer = () => {
  return (
    <>
    <Section2>
      <Div3>
        <Flex>
          <FlexItem>
            <Div3>
              <div style={{ width: '100%', marginBottom: '1.25rem' }}>
                <Img src={MFS_Logo} alt="logo" />
              </div>
              <p style={{ color: '#333333' }}>
                We provide Home Owners with the most accurate flood risk intelligence.
              </p>
              <p style={{ color: '#333333' }}>
                <strong>
                  <strong>No agenda. No bias. </strong>
                </strong>
              </p>
              <p style={{ color: '#333333' }}>
                Just the most up-to-date information available so Home Owners can make
                informed decisions about protecting their biggest asset!
              </p>
            </Div3>
          </FlexItem>
          <Div3
            style={{
              // backgroundColor: 'blue',
              width: '66.66%'
            }}
          >
            <Div4>
              <Flex>
                <FlexItem>
                  <h1
                    style={{
                      color: '#333333',
                      fontSize: '1.9rem',
                      marginBottom: '1.9rem'
                    }}
                  >
                    Product
                  </h1>
                  <ul style={{ listStyle: 'none' }}>
                    <Li>
                      > <Link href="#">Why MyFloodScore</Link>
                    </Li>
                    <Li>
                      > <Link href="#">Products & Services</Link>
                    </Li>
                    <Li>
                      > <Link href="#">Data Quality</Link>
                    </Li>
                  </ul>
                </FlexItem>
                <FlexItem>
                  <h1
                    style={{
                      color: '#333333',
                      fontSize: '1.9rem',
                      marginBottom: '1.9rem'
                    }}
                  >
                    Product
                  </h1>
                  <ul style={{ listStyle: 'none' }}>
                    <Li>
                      > <Link href="#">About</Link>
                    </Li>
                    <Li>
                      > <Link href="#">Contact</Link>
                    </Li>
                    <Li>
                      > <Link href="#">Careers</Link>
                    </Li>
                  </ul>
                </FlexItem>
                <FlexItem>
                  <h1
                    style={{
                      color: '#333333',
                      fontSize: '1.9rem',
                      marginBottom: '1.9rem'
                    }}
                  >
                    Product
                  </h1>
                  <ul style={{ listStyle: 'none' }}>
                    <Li>
                      > <Link href="#">Terms of Service</Link>
                    </Li>
                    <Li>
                      > <Link href="#">Privacy and Statement</Link>
                    </Li>
                  </ul>
                </FlexItem>
              </Flex>
              <hr style={{ backgroundColor: '#0d238e' }} />
              <Flex>
                <FlexItem2></FlexItem2>
                <FlexItem2></FlexItem2>
                <FlexItem>
                  <SocialMediaButton
                    title="facebook"
                    href="#"
                    svgGray={facebook_gray}
                    svgWhite={facebook_white}
                    backgroundImage={facebook_background}
                  />

                  <SocialMediaButton
                    title="twitter"
                    href="#"
                    svgGray={twitter_gray}
                    svgWhite={twitter_white}
                    backgroundImage={twitter_background}
                  />

                  <SocialMediaButton
                    title="instagram"
                    href="#"
                    svgGray={insta_gray}
                    svgWhite={insta_white}
                    backgroundImage={insta_background}
                  />
                </FlexItem>
              </Flex>
            </Div4>
          </Div3>
        </Flex>
      </Div3>
    </Section2>

    <footer
      style={{
        width: '100%',
        backgroundColor: '#061045',
        position: 'relative'
      }}
    >
      <Section3>
        <p
          style={{
            color: '#BBBB',
            fontSize: '0.9rem',
            display: 'inline-block',
            margin: 0
          }}
        >
          Copyright © 2019 No Flood Florida. Independent and certified flood risk intelligence
          for homeowners. All Rights Reserved. Site by Skillful Antics.
        </p>
      </Section3>
    </footer>
    </>
  )
}

const Img = styled.img`
	width: 100%;
	@media (max-width: 900px) {
		width: 40%;
	}
`;

const Div4 = styled.div`
	text-align: left;
	margin-top: 5.5rem;

	@media (max-width: 900px) {
		margin-top: 1rem;
	}
`;

const Div3 = styled.div`
	text-align: left;
	padding: 1.9rem;

	@media (max-width: 900px) {
		padding: 1.9rem;
	}
`;

const Flex = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	@media (max-width: 900px) {
		flex-direction: column;
	}
`;

const FlexItem = styled.div`
	width: 33.33%;

	@media (max-width: 900px) {
		width: 100%;
	}
`;
const FlexItem2 = styled.div`
	width: 33.33%;
	@media (max-width: 1110px) {
		display: none;
	}
`;

const Section2 = styled.section`
	text-align: center;
	padding: 4rem 0;

	@media (max-width: 1030px) {
		padding: 2.5rem 0;
	}

	@media (max-width: 600px) {
		padding: 1.5rem 0;
	}
`;

const Section3 = styled.section`
	text-align: center;
	padding: 2rem 0;
`;

const Li = styled.li`
	&:not(:last-child) {
		margin-bottom: 0.6rem;
	}
`;

const Link = styled.a`
	&,
	&:link,
	&:visited,
	&:hover,
	&:active,
	&:focus {
		color: #0d238e;
		text-decoration: none;
	}
`;

export default Footer
