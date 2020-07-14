import React from 'react';
import styled, { keyframes } from 'styled-components';

const blowup = keyframes`
  0% {
	transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ResultsCard = styled.div`
	width: 40vw;
	margin: auto;
	position: relative;
	text-align: center;
	height: auto;
	padding: 1px;
	background-color: #faebd7;
	color: palevioletred;
	margin-top: 1em;
	margin-bottom: 1em;
	font-size: 15px;
	font-weight: 500;
	animation: ${blowup} 1s;
	border-radius: 10px;
	box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
`;

const AdvancedOptions = styled.div`
	position: absolute;
	right: -8em;
	top: 1em;
	display: inline-grid;
	align-items: center;
`;

const ButtonAdvancedResults = styled.button`
	margin: 1em 0;
	width: 6em;
	border: ${(props) =>
		props.theme === 'light'
			? ' 1px solid palevioletred'
			: ' 1px solid transparent'};
	border-radius: 6px;
	padding: 7px;
	background-color: white;
	color: palevioletred;
	font-size: 15px;
	font-weight: 500;
	transition: all 0.2s ease-in-out;
	&:hover {
		transform: scale(1.1);
		cursor: pointer;
		border: 1px solid palevioletred;
	}
`;

const Bold = styled.h4`
	display: contents;
	color: palevioletred;
	font-size: 1.5em;
	font-weight: 700;
`;

const ResultsBox = ({ countryCode, results, setResetMap, theme }) => {
	let averageCountryTraveled = 5.29;
	let userCountrytraveled = Object.keys(countryCode).length;
	let countryRate = userCountrytraveled / averageCountryTraveled;
	countryRate = countryRate.toFixed(1);
	let travelerRank = '';

	if (results) {
		if (userCountrytraveled <= 2) travelerRank = 'Coach Potato  🥔 ';
		if (userCountrytraveled > 2 && userCountrytraveled <= 5)
			travelerRank = 'Young Scout 🐿 ';
		if (userCountrytraveled > 5 && userCountrytraveled <= 10)
			travelerRank = 'Adventurous 🧑‍🚀 🚀 ';
		if (userCountrytraveled > 10) travelerRank = 'Phileas Fogg  🌍 🛸 ';
	}

	return (
		<ResultsCard>
			<h4>
				You have explored <Bold>{results}</Bold> of the world!{' '}
				<Bold> 🎊 🎉</Bold> ({userCountrytraveled} countries)
			</h4>
			<h4>
				You earn the rank of <Bold>{travelerRank}!</Bold>
			</h4>
			<h4>
				You travel <Bold>{countryRate}</Bold> times the average
			</h4>
			<AdvancedOptions>
				{/* <ButtonAdvancedResults theme={theme}>
					More Analytics
				</ButtonAdvancedResults> */}
				<ButtonAdvancedResults theme={theme}>Share it</ButtonAdvancedResults>
				<ButtonAdvancedResults theme={theme} onClick={setResetMap}>
					Reset
				</ButtonAdvancedResults>
			</AdvancedOptions>
		</ResultsCard>
	);
};

export default ResultsBox;
