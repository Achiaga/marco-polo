import React, { Suspense, useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactGA from 'react-ga';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/themes/globalStyles';
import { lightTheme, darkTheme } from './components/themes/themes';
import { useDarkMode } from './components/themes/useDarkMode';

import { data } from './CountryCodes';
import Autocomplete from './components/autocomplete/autocomplete';
import ResultsBox from './components/results-box';
import Loader from './components/loader/loader';
import Toggle from './components/toggle/toggle';
import PlaneImg from './assets/plane.png';

{
	/* <script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1903260,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script> */
}

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

const ExplanationCard = styled.div``;

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
	top: 1em;
	right: 1em;
	z-index: 9999;
`;

const InformationWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 1em;
`;

const BlankSpace = styled.div`
	width: 9vw;
`;

const ResultsWrapper = styled.div`
	padding: 1em;
	width: 30vw;
	z-index: 9999;
`;

const ExplanationCardWrrapper = styled.div`
	width: 35vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const List = styled.ul`
	color: ${(props) => (props.theme === 'light' ? ' black' : ' burlywood')};
	margin: 0;
	font-size: 20px;
	font-weight: 700;
`;

const ListItems = styled.li`
	padding: 0.2em 0;
	font-family: 'Anonymous Pro', monospace;
`;

const Emoji = styled.span`
	font-size: 30px;
`;

const ModalWrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 999999;
	background: rgba(0, 0, 0, 0.5);
`;

const blowup = keyframes`
  0% {
	transform: translate(31vw, 0vh) scale(0) ;
  }
  100% {
    transform: translate(31vw, 15vh) scale(1) ;
  }
`;

const AutocompleteModalWrapper = styled.div`
	z-index: 999999999;
	position: absolute;
	animation: ${blowup} 0.8s;
	transform: translate(31vw, 15vh);
`;

const BlankAutcomplete = styled.div`
	height: 104px;
`;

const CreditsWrapper = styled.div`
	display: grid;
	justify-content: center;
	text-align: center;
	margin-bottom: 1.5em;
	color: palevioletred;
`;
const Credits = styled.span`
	font-size: 20px;
	padding: 0;
`;

const Loading = () => {
	return (
		<Spinner>
			<DoubleBounce1></DoubleBounce1>
			<DoubleBounce2></DoubleBounce2>
		</Spinner>
	);
};

const Modal = ({
	handleCloseModal,
	modalState,
	handleOpenModal,
	countriesList,
	setColorMap,
	theme,
	setResetMap,
}) => {
	return (
		<>
			<ModalWrapper onClick={handleCloseModal} />
			<AutocompleteModalWrapper>
				<Autocomplete
					modalState={modalState}
					handleOpenModal={handleOpenModal}
					countriesList={countriesList}
					setColorMap={setColorMap}
					theme={theme}
					setResetMap={setResetMap}
				/>
			</AutocompleteModalWrapper>
		</>
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
	const [modalState, setModalState] = useState(false);
	const [countryCode, setCountryCode] = useState({});
	const [results, setResults] = useState('0.0%');
	const [theme, themeToggler] = useDarkMode();
	const themeMode = theme === 'light' ? lightTheme : darkTheme;

	console.log(modalState);

	useEffect(() => {
		const trackingId = 'UA-172521898-1';
		ReactGA.initialize(trackingId);
		ReactGA.pageview('/');
		(function (h, o, t, j, a, r) {
			h.hj =
				h.hj ||
				function () {
					(h.hj.q = h.hj.q || []).push(arguments);
				};
			h._hjSettings = { hjid: 1903260, hjsv: 6 };
			a = o.getElementsByTagName('head')[0];
			r = o.createElement('script');
			r.async = 1;
			r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
			a.appendChild(r);
		})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
	}, []);

	const setColorMap = (name, index) => {
		let saveCountry = countriesList[name];
		ReactGA.event({
			category: 'Countries',
			action: saveCountry,
		});
		setCountryCode({
			...countryCode,
			[name]: { fillKey: 'MEDIUM' },
		});
		setModalState(false);
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

	const handleOpenModal = () => {
		setModalState(true);
	};

	const handleCloseModal = () => {
		setModalState(false);
	};

	return (
		<ThemeProvider theme={themeMode}>
			<>
				<GlobalStyles />
				<HomeWrapper>
					{modalState ? (
						<Modal
							modalState={modalState}
							handleOpenModal={handleOpenModal}
							countriesList={countriesList}
							setColorMap={setColorMap}
							theme={theme}
							setResetMap={setResetMap}
							handleCloseModal={handleCloseModal}
						/>
					) : null}
					<Title>
						MARCO POLO<Plane src={PlaneImg} alt='plane'></Plane>
					</Title>

					<ToggleWrapper>
						<Toggle theme={theme} toggleTheme={themeToggler} />
					</ToggleWrapper>
					{!modalState ? (
						<Autocomplete
							modalState={modalState}
							handleOpenModal={handleOpenModal}
							countriesList={countriesList}
							setColorMap={setColorMap}
							theme={theme}
							setResetMap={setResetMap}
						/>
					) : (
						<BlankAutcomplete />
					)}
					<InformationWrapper>
						<BlankSpace />
						<ExplanationCardWrrapper>
							<ExplanationCard>
								<List theme={theme}>
									<ListItems>
										Add visited countries <Emoji>🗺</Emoji>
									</ListItems>
									<ListItems>
										Track your progress <Emoji>🚀</Emoji>
									</ListItems>
									<ListItems>
										Compare against other travelers <Emoji>🛫</Emoji>
									</ListItems>
									<ListItems>
										Share it with other travelers <Emoji>🏝</Emoji>
									</ListItems>
								</List>
							</ExplanationCard>
						</ExplanationCardWrrapper>
						<ResultsWrapper>
							<ResultsBox
								countryCode={countryCode}
								results={results}
								theme={theme}
							/>
						</ResultsWrapper>
					</InformationWrapper>
					<Suspense fallback={<Loader />}>
						<Map
							countryCode={countryCode}
							handleClickCountry={handleClickCountry}
						/>
					</Suspense>
				</HomeWrapper>
				<CreditsWrapper>
					<Credits>Developed it by @bender_dev</Credits>
					<Credits>
						If you want me to continue developing it, you can support it with:{' '}
						<a href='https://www.buymeacoffee.com/benderdev' target='_blank'>
							<img
								src='https://cdn.buymeacoffee.com/buttons/default-orange.png'
								alt='Buy Me A Coffee'
								style={{
									height: '40px ',
									width: '155px ',
								}}
							/>
						</a>
					</Credits>
				</CreditsWrapper>
			</>
		</ThemeProvider>
	);
}

export default App;
