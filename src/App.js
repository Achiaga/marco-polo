import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SearchLocation } from '@styled-icons/fa-solid';
import Datamap from 'datamaps';
import { AutocompleteList } from './AutocompleteList';
import { data } from './CountryCodes';

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

const AutocompleteBox = styled.div``;

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
`;

const mapsFunctions = (countryCode) => {
	const oldMap = document.getElementById('container');
	const svgChild = oldMap.getElementsByTagName('svg');
	if (svgChild[0]) {
		oldMap.removeChild(svgChild[0]);
	}
	new Datamap({
		element: document.getElementById('container'),
		fills: {
			HIGH: '#f4acb7',
			LOW: '#f4acb7',
			MEDIUM: '#f4acb7',
			UNKNOWN: '#f4acb7',
			defaultFill: '#d8e2dc',
		},
		data: countryCode,
		geographyConfig: {
			highlightFillColor: '#f6bd60',
			highlightBorderColor: '#f7ede2',
			popupTemplate: function (geo, data) {
				return [
					'<div class="hoverinfo"><strong>',
					'YEAR : ' + data.year,
					'</strong></div>',
				].join('');
			},
		},
	});
};

function useWindowSize() {
	const isClient = typeof window === 'object';

	function getSize() {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined,
		};
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) {
			return false;
		}

		function handleResize() {
			setWindowSize(getSize());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return windowSize;
}

function App() {
	const [inputValue, setInputValue] = useState('');
	const [suggestionList, setSuggestionList] = useState([]);
	const [countryCode, setCountryCode] = useState({});
	const [navigationIndex, setNavigationIndex] = useState(-1);
	const size = useWindowSize();

	const info = {
		IRL: {
			fillKey: 'MEDIUM',
			year: 2002,
		},
		USA: {
			fillKey: 'MEDIUM',
			year: 2002,
		},
		ESP: {
			fillKey: 'MEDIUM',
			year: 2002,
		},
		FRA: {
			fillKey: 'MEDIUM',
			year: 2002,
		},
	};

	console.log(info);
	console.log(countryCode);

	useEffect(() => {
		mapsFunctions(countryCode);
	}, [countryCode]);

	useEffect(() => {
		mapsFunctions(countryCode);
	}, [size.width]);

	const handleInput = (e) => {
		const { value } = e.target;
		setInputValue(value);
		handleAutocomplete(value);
	};

	const handleKeyPress = (e) => {
		let cont;
		if (e.keyCode == 40) {
			cont = navigationIndex;
			cont++;
			setNavigationIndex(cont);
		}
		if (e.keyCode == 38) {
			cont = navigationIndex;
			cont--;
			setNavigationIndex(cont);
		}
		if (e.keyCode == 13 && navigationIndex > -1) {
			suggestionList[navigationIndex].alpha3 = suggestionList[
				navigationIndex
			].alpha3.toUpperCase();
			setCountryCode({
				...countryCode,
				[suggestionList[navigationIndex].alpha3]: { fillKey: 'MEDIUM' },
			});
			setSuggestionList([]);
			setNavigationIndex(-1);
			setInputValue('');
		}
	};

	const handleClick = (e) => {
		console.log('click', inputValue);
	};

	const handleSuggestion = (index) => {
		setCountryCode(suggestionList[index]);
		setSuggestionList([]);
		setNavigationIndex(-1);
		setInputValue('');
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

	return (
		<HomeWrapper>
			<Title>MARCO POLO</Title>
			<AutocompleteBox>
				<AutocompleteInput>
					<Autocomplete
						value={inputValue}
						onChange={handleInput}
						onKeyDown={handleKeyPress}
					/>
					<SearchIcon onClick={handleClick} />
				</AutocompleteInput>
				<AutocompleteList
					suggestionList={suggestionList}
					handleSuggestion={handleSuggestion}
					navigationIndex={navigationIndex}
				/>
			</AutocompleteBox>
			<div
				id='container'
				style={{
					margin: 'auto',
					position: 'relative',
					width: size.width,
					height: size.height,
				}}
			/>
		</HomeWrapper>
	);
}

export default App;
