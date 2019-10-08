import React from 'react'
import styled from 'styled-components'

import OptionsLinks from './OptionsLinks'

import DiscoverOptions from './DiscoverOptions'
import CompareOptions from './CompareOptions'
import ExamineOptions from './ExamineOptions'
import CertifyOptions from './CertifyOptions'
import ReduceOptions from './ReduceOptions'

const Options = () => {
  return (
    <>
			<Section1>
				<h1>My Flood Score – Report and Account Options</h1>
				<OptionsLinks l1="#a" l2="#b" l3="#c" l4="#d" l5="#e" />
			</Section1>
			<DiscoverOptions />
			<CompareOptions />
			<ExamineOptions />
			<CertifyOptions />
			<ReduceOptions />
    </>
  )
}

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



export default Options