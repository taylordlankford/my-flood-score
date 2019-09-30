import React from 'react'
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import * as data from './OptionsData'
import OptionsLinks from './OptionsLinks'
import Card from '../../components/Options/Card'

const Options = () => {
  return (
    <>
			<Section1>
				<h1>My Flood Score – Report and Account Options</h1>
				<OptionsLinks l1="#a" l2="#b" l3="#c" l4="#d" l5="#e" />
			</Section1>
			<Section2 id="a">
				<Div>
					<H2>
						<strong>DISCOVER</strong> - My Flood Score
					</H2>
					<hr />
					<Container style={{ marginTop: '2.8rem' }}>
						<Row>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList1} styles={data.styles1} />
							</Col>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList2} styles={data.styles2} />
							</Col>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList3} styles={data.styles3} />
							</Col>
						</Row>
					</Container>
				</Div>
			</Section2>
			<Section2 id="b">
				<Div>
					<H2>
						<strong>COMPARE</strong> - My Flood Snapshop
					</H2>
					<hr />
					<Container style={{ marginTop: '2.8rem' }}>
						<Row>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList4} styles={data.styles4} />
							</Col>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList5} styles={data.styles5} />
							</Col>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList6} styles={data.styles6} />
							</Col>
						</Row>
					</Container>
				</Div>
			</Section2>
			<Section2 id="c">
				<Div2>
					<H2>
						<strong>EXAMINE</strong> - My Flood Analysis Memo
					</H2>
					<hr />
					<Container style={{ marginTop: '2.8rem' }}>
						<Row>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList7} styles={data.styles7} />
							</Col>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList8} styles={data.styles8} />
							</Col>
						</Row>
					</Container>
				</Div2>
			</Section2>
			<Section2 id="d">
				<Div2>
					<H2>
						<strong>CERTIFY</strong> - My Flood Safe
					</H2>
					<hr />
					<Container style={{ marginTop: '2.8rem' }}>
						<Row>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList9} styles={data.styles9} />
							</Col>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList10} styles={data.styles10} />
							</Col>
						</Row>
					</Container>
				</Div2>
			</Section2>
			<Section2 id="e">
				<Div2>
					<H2>
						<strong>REDUCE or ELIMINATE </strong>- LOMA
					</H2>
					<hr />
					<Container style={{ marginTop: '2.8rem' }}>
						<Row>
							<Col
								style={{
									padding: '0'
								}}
							>
								<Card detailsList={data.detailsList11} styles={data.styles11} />
							</Col>
						</Row>
					</Container>
				</Div2>
			</Section2>
    </>
  )
}


const Div = styled.div`
	/* style={{ width: '75%', display: 'inline-block' }} */
	width: 75%;
	display: inline-block;

	@media (max-width: 600px) {
		width: 85%;
	}
`;

const Div2 = styled.div`
	/* style={{ width: '75%', display: 'inline-block' }} */
	width: 50%;
	display: inline-block;

	@media (max-width: 600px) {
		width: 85%;
	}
`;

const Section1 = styled.section`
	width: 100%;
	background-color: #0d238e;
	text-align: center;
	padding: 4rem;
	@media (max-width: 1030px) {
		padding: 2.5rem;
	}

	@media (max-width: 600px) {
		padding: 1.5rem;
	}

	& > h1 {
		color: white;
		font-size: 2.5rem;
		font-weight: 700;
		@media (max-width: 770px) {
			font-size: 1.9rem;
		}
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

const H2 = styled.h2`
	color: #0d238e;
	font-size: 2.1rem;
	line-height: 1.4;
	font-weight: 700;
	letter-spacing: 0em;
	margin-bottom: 1.6rem;

	@media (max-width: 770px) {
		font-size: 1.6rem;
	}
`;

export default Options