import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'

const Card = ({ detailsList, styles, history }) => {
	const makeList = () => {
		const arr = [];
		detailsList.forEach((item, index) => {
			arr.push(<Li key={index}>{item}</Li>);
		});
		return arr;
	};

	const Button = styled.a`
		&,
		&:link,
		&:visited {
			color: ${styles.premium ? 'white !important' : '#666666 !important'};
			cursor: pointer;
			background-color: ${styles.premium ? '#55B96A' : '#C4C4C4'};
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

	return (
		<div
			style={{
				minWidth: '17rem',
				width: `${styles.width}`,
				textAlign: 'center',
				borderLeft: `${styles.premium ? 'none' : '1px solid #C4C4C4'}`,
				borderTop: `${styles.premium ? 'none' : '1px solid #C4C4C4'}`,
				borderRight: `${styles.border ? '1px solid #C4C4C4' : ''}`,
				borderBottom: `${styles.premium ? 'none' : '1px solid #C4C4C4'}`,
				borderRadius: `${styles.startStart} ${styles.startEnd} ${styles.endEnd} ${styles.endStart}`,
				boxShadow: `${styles.premium ? '0 1px 10px rgba(0,0,0,0.15)' : 'none'}`,
				transform: `${styles.premium ? 'translateY(-0.94rem)' : 'none'}`
			}}
		>
			<div
				style={{
					// height: '10rem',
					padding: `${styles.premium ? '2.5rem 0' : '1.9rem 0'}`,
					borderRadius: `${styles.startStart} ${styles.startEnd} 0 0`,
					backgroundColor: `${styles.premium ? '#55B96A' : '#F2F2F2'}`
				}}
			>
				<h5
					style={{
						fontSize: '1.2rem',
						color: `${styles.premium ? 'white' : '#0D238E'}`,
						fontWeight: 700
					}}
				>
					{styles.title}
				</h5>
				<h1
					style={{
						fontSize: '4.4rem',
						fontWeight: '700',
						color: `${styles.premium ? 'white' : '#666666'}`
					}}
				>
					${styles.price}
				</h1>
				{styles.premium ? (
					<h4 style={{ color: 'white', fontSize: '0.9rem' }}>{styles.subTitle}</h4>
				) : null}
			</div>
			<div
				style={{
					textAlign: 'center'
				}}
			>
				<ul
					style={{
						width: '100%',
						listStyle: 'none',
						display: 'inline-block',
						padding: '1.6rem',
						paddingBottom: '0.6rem'
					}}
				>
					{makeList()}
				</ul>
			</div>
			<div
				style={{
					paddingTop: '0.6rem',
					paddingBottom: '2.2rem'
				}}
			>
				<Button onClick={() => history.push(styles.link)} variant="primary">SIGN UP</Button>
				{/* <Link to={styles.link}>SIGN UP</Link> */}
				
			</div>
		</div>
	);
};

const Li = styled.li`
	font-size: 1.25rem;
	color: #666666;
	&:not(:last-child) {
		margin-bottom: 0.6rem;
	}
`;

export default withRouter(Card)
