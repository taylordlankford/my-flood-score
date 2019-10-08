import styled from 'styled-components'

export const TopSection = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ebebeb;
  background-color: #0d238e;
  text-align: center;
  padding: 2rem;
`;


export const Button = styled.a`
		&,
		&:link,
		&:visited {
      margin-bottom: 35px;
			color: white !important;
			cursor: pointer;
			background-color: #8560a8;
			background-image: linear-gradient(90deg, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.2) 50%);
			font-size: 0.94rem;
			font-weight: 700;
			border-radius: 5px;
			border: none;
			display: inline-block;
			padding: 0.62rem 1.25rem;
			text-decoration: none;
			text-transform: uppercase;
			background-size: 230%;
			transition: all 0.4s;
		}

		&:hover {
			background-position: 100%;
			color: white;
		}

		&:active {
			outline: none;
			transform: scale(0.9);
		}
  `;
