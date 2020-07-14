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
	width: 30em;
	margin: auto;
	position: relative;
	height: auto;
	padding: 0.7em 0.3em;
	background-color: #faebd7;
	color: palevioletred;
	margin-top: 1em;
	margin-bottom: 1em;
	display: flex;
	justify-content: center;
	text-align: center;
	font-size: 15px;
	font-weight: 500;
	animation: ${blowup} 1s;
	border-radius: 10px;
	box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
`;

const AdvancedOptions = styled.div`
	position: absolute;
	right: -8em;
	top: 0;
	display: inline-grid;
	align-items: center;
`;

const ButtonAdvancedResults = styled.button`
	margin-top: 5px;
	margin-bottom: 5px;
	width: 6em;
	border: 1px solid palevioletred;
	border-radius: 6px;
	padding: 7px;
	background-color: white;
	color: palevioletred;
	font-size: 15px;
	font-weight: 500;
	&:hover {
		cursor: pointer;
	}
`;

const Bold = styled.p`
	display: contents;
	color: palevioletred;
	font-size: 23px;
	font-weight: 700;
`;

const ResultsBox = ({ countryCode, results, setResetMap }) => {
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
			You have explored <Bold>{results}</Bold> of the world! <Bold> 🎊 🎉</Bold>{' '}
			({userCountrytraveled} countries)
			<br />
			<br /> You earn the rank of <Bold>{travelerRank}!</Bold> <br />
			<br /> You travel <Bold>{countryRate}</Bold> times the average
			<br />
			<AdvancedOptions>
				<ButtonAdvancedResults>More Results</ButtonAdvancedResults>
				<ButtonAdvancedResults>Share it</ButtonAdvancedResults>
				<ButtonAdvancedResults onClick={setResetMap}>
					Reset
				</ButtonAdvancedResults>
			</AdvancedOptions>
		</ResultsCard>
	);
};

export default ResultsBox;
