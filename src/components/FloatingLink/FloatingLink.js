import React from 'react'
import styled from 'styled-components'
import arrow from '../../assets/images/arrow.svg'

const FloatingLink = () => {
	return (
		<A href="#">
			<img
				style={{
					width: '1.25rem',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}}
				src={arrow}
				alt=""
			/>
		</A>
	);
};

const A = styled.a`
	width: 3.1rem;
	height: 3.1rem;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	z-index: 2;
	transition: all 0.4s;
	&:hover {
		background-color: #55b96a;
	}
`;

export default FloatingLink
