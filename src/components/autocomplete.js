import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { SearchLocation } from '@styled-icons/fa-solid';

import { data } from '../CountryCodes';

import { AutocompleteList } from './AutocompleteList';

const AutocompleteBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
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

const AutocompleteInput = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	width: fit-content;
	position: relative;
`;
const AutocompleteWrapper = styled.input`
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

const parseObject = (data) => {
	return Object.keys(data).reduce((acc, item) => {
		return {
			...acc,
			[data[item].toUpperCase()]: item,
		};
	}, {});
};

const Autocomplete = ({ setColorMap, countriesList, theme }) => {
	const [newList, setNewList] = useState(parseObject(countriesList));
	const [inputValue, setInputValue] = useState('');
	const [suggestionList, setSuggestionList] = useState([]);
	const [navigationIndex, setNavigationIndex] = useState(0);

	const handleInput = (e) => {
		const { value } = e.target;
		setInputValue(value);
		handleAutocomplete(value);
	};

	const handleAutocomplete = (value) => {
		let suggestionArray;

		if (value) {
			suggestionArray = Object.keys(newList).filter((word) =>
				word.toLowerCase().includes(value.toLowerCase())
			);
			suggestionArray = suggestionArray.slice(0, 5);
			setSuggestionList(suggestionArray);
		} else if (value === '') {
			setSuggestionList([]);
		}
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
					handleSuggestion(suggestionList[navigationIndex]);
				} else if (suggestionList.length === 1) {
					setColorMap(suggestionList, 0);
				}
				setSuggestionList([]);
				setNavigationIndex(0);
				setInputValue('');
			}
		} else {
			setNavigationIndex(0);
		}
	};

	const handleClick = useCallback((e) => {
		if (suggestionList) {
			setColorMap(suggestionList, 0);
		}
	}, []);

	const handleSuggestion = (item) => {
		setColorMap(newList[item]);
		setSuggestionList([]);
		setNavigationIndex(0);
		setInputValue('');
	};

	return (
		<AutocompleteBox>
			<AutocompleteInput>
				<AutocompleteWrapper
					value={inputValue}
					onChange={handleInput}
					onKeyDown={handleKeyPress}
					placeholder='Search for a Country'
				/>
				<SearchIcon onClick={handleClick} />
				<AutocompleteList
					suggestionList={suggestionList}
					handleSuggestion={handleSuggestion}
					navigationIndex={navigationIndex}
					theme={theme}
				/>
			</AutocompleteInput>
		</AutocompleteBox>
	);
};
export default Autocomplete;
