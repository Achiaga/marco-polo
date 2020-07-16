import React, { Suspense, useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from 'react-device-detect';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/themes/globalStyles';
import { lightTheme, darkTheme } from './components/themes/themes';
import { useDarkMode } from './components/themes/useDarkMode';

import { data } from './CountryCodes';
import { InitializeAnalytics, AnalyticsEvent } from './utils/analytics';
import PlaneImg from './assets/plane.png';
import Loader from './components/loader/loader';
import Toggle from './components/toggle/toggle';
import Autocomplete from './components/autocomplete/autocomplete';
import Information from './components/information/information';
import Footer from './components/footer/footer';

const Map = React.lazy(() => import('./components/map/map'));

const HomeWrapper = styled.div``;

const Title = styled.h1`
	position: absolute;
	width: 8em;
	left: 0.5em;
	font-size: 2.2em;
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

const ToggleWrapper = styled.div`
	position: absolute;
	top: 1em;
	right: 1em;
	z-index: 9999;
`;

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
	const [results, setResults] = useState('0.0%');
	const [theme, themeToggler] = useDarkMode();
	const themeMode = theme === 'light' ? lightTheme : darkTheme;

	useEffect(() => {
		try {
			InitializeAnalytics();
		} catch (err) {
			console.log('HOTJAR not working on local');
		}
	}, []);

	const setColorMap = (name, index) => {
		let saveCountry = countriesList[name];
		AnalyticsEvent('Countries', saveCountry);
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
					setResetMap={setResetMap}
				/>
				<Information
					countryCode={countryCode}
					results={results}
					theme={theme}
				/>
				<Suspense fallback={<Loader />}>
					<Map
						countryCode={countryCode}
						handleClickCountry={handleClickCountry}
					/>
				</Suspense>
				<Footer />
			</HomeWrapper>
		</ThemeProvider>
	);
}

export default App;
