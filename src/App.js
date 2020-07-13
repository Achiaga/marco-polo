import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SearchLocation } from '@styled-icons/fa-solid';
import { AutocompleteList } from './AutocompleteList';
import { data } from './CountryCodes';
import Map from './map';
import ReactGA from 'react-ga';

const HomeWrapper = styled.div``;

const Title = styled.h1`
	font-size: 4em;
	margin-top: 0.3em;
	margin-bottom: 0.5em;
	font-weight: 400;
	text-align: center;
	color: palevioletred;
	font-family: 'Fredericka the Great', cursive;
`;

const AutocompleteBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const AutocompleteInput = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	width: fit-content;
	position: relative;
`;

const Autocomplete = styled.input`
	display: flex;
	font-size: 20px;
	width: 10em;
	padding: 0.3em;
	border: 1px solid palevioletred;
	border-radius: 6px 0px 0px 6px;
	color: palevioletred;
	background: white;
	height: 1.3em;
`;

const SearchIcon = styled(SearchLocation)`
	width: 24px;
	border: 1px solid palevioletred;
	border-radius: 0px 6px 6px 0px;
	padding: 7px;
	background-color: palevioletred;
	color: white;
	&:hover {
		cursor: pointer;
		background-color: #da537f;
		color: white;
	}
	position: absolute;
	right: -40px;
`;

const DoneButton = styled.button`
	width: 6em;
	border: 2px solid palevioletred;
	border-radius: 6px;
	padding: 7px;
	background-color: white;
	color: palevioletred;
	margin: auto;
	margin-top: 2em;
	margin-bottom: 2em;
	display: flex;
	justify-content: center;
	font-size: 20px;
	font-weight: 700;
	&:hover {
		cursor: pointer;
		background-color: #da537f;
		color: white;
	}
`;

const DoneButtonDisabled = styled.div`
	width: 6em;
	height: 3em;
	margin-top: 2em;
	margin-bottom: 2em;
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
	font-size: 25px;
	font-weight: 500;
`;

const ButtonAdvancedResults = styled.button`
	position: absolute;
	right: -8em;
	width: 6em;
	border: 2px solid palevioletred;
	border-radius: 6px;
	padding: 7px;
	background-color: white;
	color: palevioletred;
	margin-top: 2em;
	margin-bottom: 2em;
	font-size: 20px;
	font-weight: 700;
	&:hover {
		cursor: pointer;
		background-color: #f4acb7;
		color: white;
	}
`;

const Bold = styled.p`
	display: contents;
	color: palevioletred;
	font-size: 27px;
	font-weight: 700;
	&:hover {
		color: #f6bd60;
	}
`;

function App() {
	const [inputValue, setInputValue] = useState('');
	const [suggestionList, setSuggestionList] = useState([]);
	const [countryCode, setCountryCode] = useState({});
	const [navigationIndex, setNavigationIndex] = useState(0);
	const [results, setResults] = useState();

	useEffect(() => {
		const trackingId = 'UA-172521898-1'; // Replace with your Google Analytics tracking ID
		ReactGA.initialize(trackingId);
		ReactGA.pageview('/');
	}, []);

	const handleInput = (e) => {
		const { value } = e.target;
		setInputValue(value);
		handleAutocomplete(value);
	};

	const handleAutocomplete = (value) => {
		let suggestionArray;
		if (value) {
			suggestionArray = data.filter((word) =>
				word.name.toLowerCase().includes(value.toLowerCase())
			);
			suggestionArray = suggestionArray.slice(0, 5);
			setSuggestionList(suggestionArray);
		} else if (value === '') {
			setSuggestionList([]);
		}
	};

	const setColorMap = (name, index) => {
		name[index].alpha3 = name[index].alpha3.toUpperCase();
		setCountryCode({
			...countryCode,
			[name[index].alpha3]: { fillKey: 'MEDIUM' },
		});
		setSuggestionList([]);
		setNavigationIndex(0);
		setInputValue('');
	};

	const handleKeyPress = (e) => {
		let cont;
		if (suggestionList.length > 0) {
			if (e.keyCode == 40) {
				if (navigationIndex < suggestionList.length - 1) {
					cont = navigationIndex;
					cont++;
					setNavigationIndex(cont);
				}
			}
			if (e.keyCode == 38) {
				if (navigationIndex > 0) {
					cont = navigationIndex;
					cont--;
					setNavigationIndex(cont);
				}
			}
			if (e.keyCode == 13) {
				if (navigationIndex > -1) {
					setColorMap(suggestionList, navigationIndex);
				} else if (suggestionList.length === 1) {
					setColorMap(suggestionList, 0);
				}
			}
		} else {
			setNavigationIndex(0);
		}
	};

	const handleClick = (e) => {
		if (suggestionList) {
			setColorMap(suggestionList, 0);
		}
	};

	const handleSuggestion = (index) => {
		setColorMap(suggestionList, index);
	};

	const handleClickCountry = (country) => {
		let countryMatch = data.filter((word) => {
			if (word.name.toLowerCase().includes(country.toLowerCase())) {
				console.log(word);
				if (word) {
					return word;
				}
			}
		});
		setColorMap(countryMatch, 0);
	};

	const handleResults = () => {
		let calc = Object.keys(countryCode).length / 1.95;
		calc = calc.toFixed(1);
		setResults(calc + '%');
	};

	const ResultsBox = () => {
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
				You have explored <Bold>{results}</Bold> of the world!{' '}
				<Bold> 🎊 🎉</Bold> ({userCountrytraveled} countries)
				<br />
				<br /> You earn the rank of <Bold>{travelerRank}!</Bold> <br />
				<br /> You travel <Bold>{countryRate}</Bold> times the average
				<br />
				<ButtonAdvancedResults>More Results</ButtonAdvancedResults>
			</ResultsCard>
		);
	};

	return (
		<HomeWrapper>
			<Title>MARCO POLO</Title>
			{!results ? (
				<AutocompleteBox>
					<AutocompleteInput>
						<Autocomplete
							value={inputValue}
							onChange={handleInput}
							onKeyDown={handleKeyPress}
						/>
						<SearchIcon onClick={handleClick} />
						<AutocompleteList
							suggestionList={suggestionList}
							handleSuggestion={handleSuggestion}
							navigationIndex={navigationIndex}
						/>
					</AutocompleteInput>
				</AutocompleteBox>
			) : null}
			{results ? (
				<ResultsBox />
			) : Object.keys(countryCode).length !== 0 ? (
				<DoneButton onClick={handleResults}>Results</DoneButton>
			) : (
				<DoneButtonDisabled />
			)}
			<Map countryCode={countryCode} handleClickCountry={handleClickCountry} />
		</HomeWrapper>
	);
}

export default App;
