import React from 'react';
import styled from 'styled-components';

const InformationMapWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => (props.theme === 'light' ? 'palevioletred' : 'white')};
	margin-bottom: 3em;
	font-size: 26px;
`;

const InformationBox = styled.div`
	width: 33%;
	height: 3em;
	text-align: center;
	border-right: 1px solid white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InformationMap = ({ countryCode, results, theme }) => {
	let averageCountryTraveled = 5.29;
	let userCountrytraveled = Object.keys(countryCode).length;
	let countryRate = userCountrytraveled / averageCountryTraveled;
	let explored = (userCountrytraveled * 100) / 251;
	countryRate = countryRate.toFixed(1);
	explored = explored.toFixed(1);
	let travelerRank = '';
	console.log(explored);
	console.log(userCountrytraveled);

	if (userCountrytraveled <= 2) travelerRank = 'Coach Potato  🥔 ';
	if (userCountrytraveled > 2 && userCountrytraveled <= 5)
		travelerRank = 'Young Scout 🐿 ';
	if (userCountrytraveled > 5 && userCountrytraveled <= 10)
		travelerRank = 'Adventurous ⛺️⛵️ ';
	if (userCountrytraveled > 10) travelerRank = 'Phileas Fogg 🧑‍🚀 🚀 ';

	return (
		<InformationMapWrapper theme={theme}>
			<InformationBox>
				{userCountrytraveled} <br /> Countries
			</InformationBox>
			<InformationBox>
				{explored}% <br /> of the world explored
			</InformationBox>
			<InformationBox>
				x{countryRate} <br /> over average person
			</InformationBox>
			<InformationBox>{travelerRank}</InformationBox>
		</InformationMapWrapper>
	);
};

export default InformationMap;
