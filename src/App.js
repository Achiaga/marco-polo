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

const AutocompleteBox = styled.div`
	margin-bottom: 3em;
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
`;

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
	FRE: {
		fillKey: 'MEDIUM',
		year: 2002,
	},
};

function App() {
	const [inputValue, setInputValue] = useState('');
	const [suggestionList, setSuggestionList] = useState([]);

	const mapsFunctions = () => {
		var map = new Datamap({
			element: document.getElementById('container'),
			fills: {
				HIGH: '#f5cac3',
				LOW: '#f5cac3',
				MEDIUM: '#f4acb7',
				UNKNOWN: 'rgb(0,0,0)',
				defaultFill: '#d8e2dc',
			},
			data: info,
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

	useEffect(() => {
		mapsFunctions();
	}, []);

	const list = [
		'Spain',
		'Estonia',
		'Slovakia',
		'Sparta',
		'Eslovaquia',
		'Satan',
		'Soviet Union',
	];

	console.log(data[0].name);

	const handleInput = (e) => {
		const { value } = e.target;
		setInputValue(value);
		handleAutocomplete(value);
	};

	const handleClick = (e) => {
		console.log('click', inputValue);
	};

	const handleAutocomplete = (value) => {
		let suggestionArray;
		if (value) {
			suggestionArray = data.filter((word, index) =>
				// word[index].toLowerCase().includes(value)
				console.log(word[index])
			);
			suggestionArray = suggestionArray.slice(0, 5);
			setSuggestionList(suggestionArray);
		} else if (value === '') {
			console.log(value);
			setSuggestionList([]);
		}
	};

	return (
		<HomeWrapper>
			<Title>MARCO POLO</Title>
			<AutocompleteBox>
				<AutocompleteInput>
					<Autocomplete value={inputValue} onChange={handleInput} />
					<SearchIcon onClick={handleClick} />
				</AutocompleteInput>
				<AutocompleteList
					suggestionList={suggestionList}
					inputValue={inputValue}
				/>
			</AutocompleteBox>
			<div
				id='container'
				style={{
					margin: 'auto',
					position: 'relative',
					width: '90vw',
					height: '600px',
				}}
			/>
		</HomeWrapper>
	);
}

export default App;
