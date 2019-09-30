import React from 'react'
import styled from 'styled-components'

const OptionsLinks = ({ l1, l2, l3, l4, l5 }) => {
	return (
		<ul style={{ overflowX: 'auto' }}>
			<Li>
				<A href={l1}>Discover</A>
			</Li>
			<Li>
				<A href={l2}>Compare</A>
			</Li>
			<Li>
				<A href={l3}>Examine</A>
			</Li>
			<Li>
				<A href={l4}>Certify</A>
			</Li>
			<Li>
				<A href={l5}>Reduce or Eliminate</A>
			</Li>
		</ul>
	);
};

const Li = styled.li`
	display: inline-block;
	&:not(:last-child) {
		margin-right: 1.25rem;
	}
`;

const A = styled.a`
	&,
	&:link,
	&:visited {
		text-decoration: none;
		margin-top: 2.5rem;
		color: rgba(255, 255, 255, 0.5);
		font-size: 1.125rem;
		transition: all 0.2s;
	}

	&:hover {
		color: rgba(255, 255, 255, 1);
	}
`;
export default OptionsLinks
