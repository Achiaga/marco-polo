import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BrowserView, MobileView } from 'react-device-detect';

const blowup = keyframes`
  0% {
	transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ResultsCard = styled.div`
	width: 29vw;
	margin: auto;
	position: relative;
	text-align: center;
	height: auto;
	background-color: #faebd7;
	color: palevioletred;
	font-size: 16px;
	font-weight: 500;
	animation: ${blowup} 1s;
	border-radius: 10px;
	box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
`;

const Bold = styled.span`
	display: contents;
	color: palevioletred;
	font-size: 1.5em;
	font-weight: 700;
`;

const ResultsCardMobile = styled.div`
	width: 80%;
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

const BoldMobile = styled.span`
	display: contents;
	color: palevioletred;
	font-size: 1.2em;
	font-weight: 700;
`;

const ResultsBox = ({ countryCode, results, theme }) => {
	let averageCountryTraveled = 5.29;
	let userCountrytraveled = Object.keys(countryCode).length;
	let countryRate = userCountrytraveled / averageCountryTraveled;
	countryRate = countryRate.toFixed(1);
	let travelerRank = '';

	if (userCountrytraveled <= 2) travelerRank = 'Coach Potato  🥔 ';
	if (userCountrytraveled > 2 && userCountrytraveled <= 5)
		travelerRank = 'Young Scout 🐿 ';
	if (userCountrytraveled > 5 && userCountrytraveled <= 10)
		travelerRank = 'Adventurous ⛺️⛵️ ';
	if (userCountrytraveled > 10) travelerRank = 'Phileas Fogg 🧑‍🚀 🚀 ';

	return (
		<>
			<BrowserView>
				<ResultsCard>
					<h5 style={{ paddingTop: '15px', marginBottom: '9px' }}>
						You have explored <Bold>{results}</Bold> of the world!{' '}
						<Bold>🌍</Bold>
					</h5>
					<h5 style={{ margin: '0px' }}>({userCountrytraveled} countries)</h5>
					<h5 style={{ marginTop: '15px' }}>
						You earn the rank of <Bold>{travelerRank}!</Bold>
					</h5>
					<h5 style={{ paddingBottom: '15px' }}>
						You travel <Bold>{countryRate}</Bold> times the average
					</h5>
				</ResultsCard>
			</BrowserView>
			<MobileView>
				<ResultsCardMobile>
					<h5 style={{ marginBottom: '9px' }}>
						You have explored <BoldMobile>{results}</BoldMobile> of the world!{' '}
						<BoldMobile>🌍</BoldMobile>
					</h5>
					<h5 style={{ margin: '0px' }}>({userCountrytraveled} countries)</h5>
					<h5 style={{ marginTop: '15px' }}>
						You earn the rank of <BoldMobile>{travelerRank}!</BoldMobile>
					</h5>
					<h5>
						You travel <BoldMobile>{countryRate}</BoldMobile> times the average
					</h5>
				</ResultsCardMobile>
			</MobileView>
		</>
	);
};

export default ResultsBox;
