import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { SearchLocation } from '@styled-icons/fa-solid';
import ReactGA from 'react-ga';

import { data } from '../../CountryCodes';

import { AutocompleteList } from './AutocompleteList';

const AutocompleteBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 3em;
	padding-bottom: 1em;
`;

const SearchIcon = styled(SearchLocation)`
	width: ${(props) => (props.modalState ? '44px' : '24px')};
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
	right: ${(props) => (props.modalState ? '-57px' : '-40px')};
`;

const AutocompleteWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	width: fit-content;
	position: relative;
`;
const AutocompleteInput = styled.input`
	display: flex;
	font-size: ${(props) => (props.modalState ? '30px' : '20px')};
	width: ${(props) => (props.modalState ? '16em' : '10em')};
	padding: 0.3em;
	border: 1px solid palevioletred;
	border-radius: 6px 0px 0px 6px;
	color: palevioletred;
	background: white;
	height: 1.3em;
`;

const AdvancedOptions = styled.div`
	position: absolute;
	right: -18em;
	top: 0.2em;
	display: flex;
	align-items: center;
`;

const ButtonAdvancedResults = styled.button`
	margin: 0 1em;
	width: 6em;
	border: ${(props) =>
		props.theme === 'light'
			? ' 1px solid palevioletred'
			: ' 1px solid transparent'};
	border-radius: 6px;
	padding: 7px;
	background-color: white;
	color: palevioletred;
	font-size: 15px;
	font-weight: 500;
	transition: all 0.2s ease-in-out;
	&:hover {
		transform: scale(1.1);
		cursor: pointer;
		border: 1px solid palevioletred;
	}
`;

const parseObject = (data) => {
	return Object.keys(data).reduce((acc, item) => {
		return {
			...acc,
			[data[item].toUpperCase()]: item,
		};
	}, {});
};

const Autocomplete = ({
	setColorMap,
	countriesList,
	theme,
	setResetMap,
	handleOpenModal,
	modalState,
}) => {
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
					handleSuggestion(suggestionList[0]);
				}
				setSuggestionList([]);
				setNavigationIndex(0);
				setInputValue('');
			}
		} else {
			setNavigationIndex(0);
		}
	};

	const handleClick = () => {
		handleSuggestion(suggestionList[0]);
	};

	const handleSuggestion = (item) => {
		setColorMap(newList[item]);
		setSuggestionList([]);
		setNavigationIndex(0);
		setInputValue('');
	};

	const handleShare = (item) => {
		ReactGA.event({
			category: 'Shared',
			action: 'Clicked',
		});
	};

	return (
		<AutocompleteBox>
			<AutocompleteWrapper>
				<AutocompleteInput
					value={inputValue}
					onClick={handleOpenModal}
					onChange={handleInput}
					onKeyDown={handleKeyPress}
					modalState={modalState}
					placeholder='Search for a Country'
				/>
				<SearchIcon onClick={handleClick} modalState={modalState} />
				{!modalState ? (
					<AdvancedOptions>
						<ButtonAdvancedResults theme={theme} onClick={setResetMap}>
							Reset
						</ButtonAdvancedResults>
						<ButtonAdvancedResults theme={theme} onClick={handleShare}>
							Share it
						</ButtonAdvancedResults>
					</AdvancedOptions>
				) : null}
				{modalState ? (
					<AutocompleteList
						modalState={modalState}
						suggestionList={suggestionList}
						handleSuggestion={handleSuggestion}
						navigationIndex={navigationIndex}
						theme={theme}
					/>
				) : null}
			</AutocompleteWrapper>
		</AutocompleteBox>
	);
};
export default Autocomplete;
