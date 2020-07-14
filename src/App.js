import React, { Suspense, useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactGA from 'react-ga';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/themes/globalStyles';
import { lightTheme, darkTheme } from './components/themes/themes';
import { useDarkMode } from './components/themes/useDarkMode';

import { data } from './CountryCodes';
import Autocomplete from './components/autocomplete';
import ResultsBox from './components/results-box';
import Loader from './components/loader/loader';
import Toggle from './components/toggle/toggle';
import PlaneImg from './assets/plane.png';

const Map = React.lazy(() => import('./map'));

const HomeWrapper = styled.div``;

const Title = styled.h1`
	position: absolute;
	width: 5em;
	left: 0.5em;
	font-size: 3em;
	font-weight: 400;
	text-align: center;
	color: palevioletred;
	font-family: 'Fredericka the Great', cursive;
`;

const Plane = styled.img`
	position: absolute;
	width: 1.5em;
	bottom: -0.5em;
`;

const BlankSpace = styled.div`
	height: 11em;
`;

const Spinner = styled.div`
	width: 40px;
	height: 40px;
	position: relative;
	margin: 100px auto;
	color: palevioletred;
`;

const skbounce = keyframes`
   0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
`;

const DoubleBounce1 = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: palevioletred;
	opacity: 0.6;
	position: absolute;
	top: 0;
	left: 0;
	-webkit-animation: ${skbounce} 2s infinite ease-in-out;
	animation: ${skbounce} 2s infinite ease-in-out;
`;

const DoubleBounce2 = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: palevioletred;
	opacity: 0.6;
	position: absolute;
	top: 0;
	left: 0;
	-webkit-animation: ${skbounce} 2s infinite ease-in-out;
	animation: ${skbounce} 2s infinite ease-in-out;
	-webkit-animation-delay: -1s;
	animation-delay: -1s;
`;
const ToggleWrapper = styled.div`
	position: absolute;
	top: 3em;
	right: 6em;
`;

const Loading = () => {
	return (
		<Spinner>
			<DoubleBounce1></DoubleBounce1>
			<DoubleBounce2></DoubleBounce2>
		</Spinner>
	);
};

const parseListTobject = (data) => {
	return data.reduce((acc, { alpha3, name }, index) => {
		return {
			...acc,
			[alpha3.toUpperCase()]: name,
		};
	}, {});
};

function App() {
	const [countriesList, setCountriesList] = useState(parseListTobject(data));
	const [countryCode, setCountryCode] = useState({});
	const [results, setResults] = useState();
	const [theme, themeToggler] = useDarkMode();

	const themeMode = theme === 'light' ? lightTheme : darkTheme;

	useEffect(() => {
		const trackingId = 'UA-172521898-1';
		ReactGA.initialize(trackingId);
		ReactGA.pageview('/');
	}, []);

	const setColorMap = (name, index) => {
		setCountryCode({
			...countryCode,
			[name]: { fillKey: 'MEDIUM' },
		});
		let calc = Object.keys(countryCode).length / 1.95;
		calc = calc.toFixed(1);
		setResults(calc + '%');
	};

	const setResetMap = () => {
		setCountryCode({});
		setResults(0 + '%');
	};

	console.log(countryCode);

	const handleClickCountry = (country) => {
		const updatedCountryList = { ...countryCode };
		if (updatedCountryList[country]) {
			delete updatedCountryList[country];
			setCountryCode(updatedCountryList);
			let calc = Object.keys(updatedCountryList).length / 1.95;
			calc = calc.toFixed(1);
			setResults(calc + '%');
			return;
		}
		setColorMap(country, 0);
	};

	return (
		<ThemeProvider theme={themeMode}>
			<>
				<GlobalStyles />
				<HomeWrapper>
					<Title>
						MARCO POLO<Plane src={PlaneImg} alt='plane'></Plane>
					</Title>

					<ToggleWrapper>
						<Toggle theme={theme} toggleTheme={themeToggler} />
					</ToggleWrapper>
					<Autocomplete
						countriesList={countriesList}
						setColorMap={setColorMap}
						theme={theme}
					/>
					{results ? (
						<ResultsBox
							countryCode={countryCode}
							results={results}
							setResetMap={setResetMap}
							theme={theme}
						/>
					) : (
						<BlankSpace />
					)}
					<Suspense fallback={<Loader />}>
						<Map
							countryCode={countryCode}
							handleClickCountry={handleClickCountry}
						/>
					</Suspense>
				</HomeWrapper>
			</>
		</ThemeProvider>
	);
}

export default App;
