import styled from 'styled-components'

export const Section2 = styled.section`
	text-align: center;
	padding: 4rem 0;

	@media (max-width: 1030px) {
		padding: 2.5rem 0;
	}

	@media (max-width: 600px) {
		padding: 1.5rem 0;
	}
`;

export const Div = styled.div`
	/* style={{ width: '75%', display: 'inline-block' }} */
	width: 75%;
	display: inline-block;

	@media (max-width: 600px) {
		width: 85%;
	}
`;

export const H2 = styled.h2`
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

export const Div2 = styled.div`
	/* style={{ width: '75%', display: 'inline-block' }} */
	width: 50%;
	display: inline-block;

	@media (max-width: 600px) {
		width: 85%;
	}
`;

export const Section1 = styled.section`
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
