import React from 'react';
import styled from 'styled-components';
import { BrowserView, MobileView, isBrowser } from 'react-device-detect';

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
	display: grid;
	justify-content: center;
	align-items: center;
`;
const LastInformationBox = styled(InformationBox)`
	border: none;
`;

const Text = styled.h5`
	margin: 0;
`;

const InformationBoxMobile = styled.div`
	width: 33%;
	height: 3em;
	text-align: center;
	border-right: 1px solid white;
	display: grid;
	justify-content: center;
	align-items: center;
	font-size: 20px;
`;
const LastInformationBoxMobile = styled(InformationBoxMobile)`
	border: none;
`;

const TextMobile = styled.p`
	margin: 0;
`;

const InformationMap = ({ countryCode, results, theme }) => {
	let averageCountryTraveled = 5.29;
	let userCountrytraveled = Object.keys(countryCode).length;
	let countryRate = userCountrytraveled / averageCountryTraveled;
	let explored = (userCountrytraveled * 100) / 251;
	countryRate = countryRate.toFixed(1);
	explored = explored.toFixed(1);
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
				<InformationMapWrapper theme={theme}>
					<InformationBox>
						<Text>{userCountrytraveled}</Text>
						<Text>Countries</Text>
					</InformationBox>
					<InformationBox>
						<Text>{explored}% </Text>
						<Text>of the world explored</Text>
					</InformationBox>
					<InformationBox>
						<Text>x{countryRate}</Text>
						<Text>over average person</Text>
					</InformationBox>
					<LastInformationBox>{travelerRank}</LastInformationBox>
				</InformationMapWrapper>
			</BrowserView>
			<MobileView>
				<InformationMapWrapper theme={theme}>
					<InformationBoxMobile>
						<TextMobile>{userCountrytraveled}</TextMobile>
						<TextMobile>Countries</TextMobile>
					</InformationBoxMobile>
					<InformationBoxMobile>
						<TextMobile>{explored}% </TextMobile>
						{isBrowser ? (
							<TextMobile>of the world explored</TextMobile>
						) : (
							<TextMobile>explored</TextMobile>
						)}
					</InformationBoxMobile>
					{isBrowser ? (
						<InformationBoxMobile>
							<TextMobile>x{countryRate}</TextMobile>
							<TextMobile>over average person</TextMobile>
						</InformationBoxMobile>
					) : null}
					<LastInformationBoxMobile>{travelerRank}</LastInformationBoxMobile>
				</InformationMapWrapper>
			</MobileView>
		</>
	);
};

export default InformationMap;
