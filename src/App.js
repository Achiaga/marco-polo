import React, { Suspense, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { BrowserView, MobileView } from 'react-device-detect';
import { AnimateSharedLayout, motion, AnimatePresence } from 'framer-motion';

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
import InformationMap from './components/InformationMap/InformationMap';
import Footer from './components/footer/footer';

const Map = React.lazy(() => import('./components/map/map'));

const HomeWrapper = styled.div``;

const TitleMobile = styled.h1`
	width: 8em;
	margin: auto;
	font-size: 2.5em;
	font-weight: 400;
	text-align: center;
	color: palevioletred;
	font-family: 'Fredericka the Great', cursive;
`;
const ToggleWrapperMobile = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 1em 0.5em;
`;

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

const ToggleWrapper = styled.div`
	position: absolute;
	top: 1em;
	right: 1em;
	z-index: 9999;
`;

const Plane = styled.img`
	position: absolute;
	width: 1.5em;
	bottom: -0.5em;
`;

const parseListTobject = (data) => {
	return data.reduce((acc, { alpha3, name }, index) => {
		return {
			...acc,
			[alpha3.toUpperCase()]: name,
		};
	}, {});
};

const Backdrop = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	background-color: #000000a1;
	top: 0;
	bottom: 0;
`;

function App() {
	const [countriesList, setCountriesList] = useState(parseListTobject(data));
	const [countryCode, setCountryCode] = useState({});
	const [results, setResults] = useState('0.0%');
	const [theme, themeToggler] = useDarkMode();
	const themeMode = theme === 'light' ? lightTheme : darkTheme;

	const [isSelected, setSelected] = useState(false);

	useEffect(() => {
		try {
			InitializeAnalytics();
		} catch (err) {
			console.log('HOTJAR not working on local');
		}
	}, []);

	const setColorMap = (name, index) => {
		setSelected(false);
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
		setSelected(false);
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

	const handleTransition = (e) => {
		e.stopPropagation();
		setSelected(true);
	};

	const handleBackdrop = (e) => {
		e.stopPropagation();
		setSelected(false);
	};
	return (
		<ThemeProvider theme={themeMode}>
			<GlobalStyles />
			<HomeWrapper>
				<MobileView>
					<ToggleWrapperMobile>
						<Toggle theme={theme} toggleTheme={themeToggler} />
					</ToggleWrapperMobile>
					<TitleMobile>MARCO POLO</TitleMobile>
				</MobileView>
				<BrowserView>
					<Title>
						MARCO POLO<Plane src={PlaneImg} alt='plane'></Plane>
					</Title>
					<ToggleWrapper>
						<Toggle theme={theme} toggleTheme={themeToggler} />
					</ToggleWrapper>
				</BrowserView>
				{isSelected && <Backdrop onClick={handleBackdrop} />}
				<Autocomplete
					style={{ position: 'absolute' }}
					countriesList={countriesList}
					setColorMap={setColorMap}
					theme={theme}
					setResetMap={setResetMap}
					isSelected={isSelected}
					handleTransition={handleTransition}
				/>
				{/* <Information
					countryCode={countryCode}
					results={results}
					theme={theme}
				/> */}
				<Suspense fallback={<Loader />}>
					<Map
						countryCode={countryCode}
						handleClickCountry={handleClickCountry}
						isSelected={isSelected}
					/>
				</Suspense>
				<InformationMap
					countryCode={countryCode}
					results={results}
					theme={theme}
				/>
				<Footer />
			</HomeWrapper>
		</ThemeProvider>
	);
}

export default App;
