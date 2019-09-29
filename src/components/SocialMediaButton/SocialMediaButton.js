import React from 'react'
import styled from 'styled-components'

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

const SocialMediaButton = ({ title, href, svgGray, svgWhite, backgroundImage }) => {
	const A = styled.a`
		display: inline-block;
		margin-right: 0.3rem;
		width: 3.1rem;
		height: 3.1rem;
		border-radius: 50px;
		position: relative;
		/* background-color: #c4c4c4; */
		background-color: #c4c4c4;
		transition: all 0.4s;
		-webkit-filter: grayscale(50%);
		-moz-filter: grayscale(50%);
		filter: grayscale(50%);

		&:hover {
			background-image: url(${backgroundImage});
			-webkit-filter: grayscale(0%);
			-moz-filter: grayscale(0%);
			filter: grayscale(0%);
			background-repeat: no-repeat;
			background-size: 3.75rem 3.75rem;
			& > img:nth-child(2) {
				opacity: 0;
			}
		}

		& > img {
			display: inline-block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 1.25rem;
			transition: all 0.4s;
		}
	`;
	return (
		<div style={{ display: 'inline-block' }}>
			<ButtonToolbar>
				<OverlayTrigger placement="top" overlay={<Tooltip id={1}>{title}</Tooltip>}>
					<A id="link" href={href}>
						<img src={svgWhite} alt="" />
						<img src={svgGray} alt="" />
					</A>
				</OverlayTrigger>
			</ButtonToolbar>
		</div>
	);
};

export default SocialMediaButton
