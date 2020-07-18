import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { SearchLocation } from '@styled-icons/fa-solid';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import jwt from 'jsonwebtoken';

import { AnalyticsEvent } from '../../utils/analytics';

import { AutocompleteList } from './AutocompleteList';

const AutocompleteBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 1.5em;
	padding-bottom: 2em;
`;

const SearchIcon = styled(SearchLocation)`
	width: 18px;
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
	right: -34px;
	top: 0px;
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
	font-size: 17px;
	width: 10em;
	padding: 0.3em;
	border: 1px solid palevioletred;
	border-radius: 6px 0px 0px 6px;
	color: palevioletred;
	background: white;
	height: 1.3em;
`;

const AdvancedOptions = styled.div`
	position: absolute;
	right: -32em;
	top: 0.2em;
	display: flex;
	align-items: center;
`;

const ButtonAdvancedResults = styled.button`
	margin: 0 1em;
	width: 8em;
	border: 1px solid palevioletred;
	border-radius: 6px;
	padding: 5px;
	background-color: white;
	border-color: ${(props) => (props.copied ? 'green' : 'palevioletred')};
	color: ${(props) => (props.copied ? 'green' : 'palevioletred')};
	font-size: 15px;
	font-weight: 500;
	transition: all 0.2s ease-in-out;
	outline: ${(props) => (props.copied ? 'none' : 'ne')};
	&:hover {
		transform: scale(1.1);
		cursor: pointer;
		border-color: ${(props) => (props.copied ? 'green' : 'palevioletred')};
	}
`;

const TwitterLink = styled.a`
	color: palevioletred;
	text-decoration: none;
`;

const AutocompleteWrapperMobile = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	width: fit-content;
	position: relative;
	padding-bottom: 1em;
	padding-top: 1em;
`;

const AutocompleteInputMobile = styled.input`
	display: flex;
	font-size: 20px;
	width: 10em;
	padding: 0.3em;
	border: 1px solid palevioletred;
	border-radius: 6px 0px 0px 6px;
	color: palevioletred;
	background: white;
	height: 1.3em;
	transform: translate(-10px, 0px);
	&:focus {
		outline: none;
	}
`;

const SearchIconMobile = styled(SearchLocation)`
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
	right: -29px;
`;

const AdvancedOptionsMobile = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 3em;
`;

const ButtonAdvancedResultsMobile = styled(ButtonAdvancedResults)`
	font-size: 13px;
`;

const Transition = styled.div`
	transform: scale(${(props) => (props.isActive ? 1.5 : 1)})
		translateY(${(props) => (props.isActive ? 50 : 0)}px);
	transition: transform 0.5s;
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
	handleTransition,
	isSelected,
	countryCode,
}) => {
	const [newList, setNewList] = useState(parseObject(countriesList));
	const [inputValue, setInputValue] = useState('');
	const [suggestionList, setSuggestionList] = useState([]);
	const [navigationIndex, setNavigationIndex] = useState(0);
	const [copied, setCopied] = useState(false);
	const inputRef = useRef();

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
			suggestionArray = suggestionArray.sort();
			if (isMobile) {
				suggestionArray = suggestionArray.slice(0, 3);
			} else {
				suggestionArray = suggestionArray.slice(0, 7);
			}
			setSuggestionList(suggestionArray);
		} else if (value === '') {
			setSuggestionList([]);
		}
	};

	const handleKeyPress = (e) => {
		let cont;
		if (suggestionList.length > 0) {
			if (e.keyCode === 40) {
				if (navigationIndex < suggestionList.length - 1) {
					cont = navigationIndex;
					cont++;
					setNavigationIndex(cont);
				}
			}
			if (e.keyCode === 38) {
				if (navigationIndex > 0) {
					cont = navigationIndex;
					cont--;
					setNavigationIndex(cont);
				}
			}
			if (e.keyCode === 13) {
				if (navigationIndex > -1) {
					handleSuggestion(suggestionList[navigationIndex]);
				} else if (suggestionList.length === 1) {
					handleSuggestion(suggestionList[0]);
				}
				setSuggestionList([]);
				setNavigationIndex(0);
				setInputValue('');
				inputRef.current.blur();
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

	const urlhash = jwt.sign({ country: countryCode }, 'marcopolo');
	const twitterText =
		`https://twitter.com/share?ref_src=twsrc%5Etfw&url=https://mytrips.now.sh?data=${urlhash}&text=` +
		encodeURIComponent(
			'This is how much a traveled! Check out this cool page to know yours: (Add screenshot)'
		);

	const handleShare = () => {
		AnalyticsEvent('Shared', 'Clicked');
		let UrlClipboard = `https://mytrips.now.sh?data=${urlhash}`;
		console.log(UrlClipboard);
		navigator.clipboard.writeText(UrlClipboard).then(
			function () {
				console.log('Async: Copying to clipboard was successful!');
				setCopied(true);
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
			}
		);
	};

	return (
		<>
			<BrowserView>
				<AutocompleteBox>
					<AutocompleteWrapper>
						<Transition isActive={isSelected} onClick={handleTransition}>
							<AutocompleteInput
								ref={inputRef}
								onChange={handleInput}
								onKeyDown={handleKeyPress}
								type='text'
								value={inputValue}
								placeholder='Search for a Country'
							/>
							<SearchIcon onClick={handleClick} />
							<AutocompleteList
								suggestionList={suggestionList}
								handleSuggestion={handleSuggestion}
								navigationIndex={navigationIndex}
								theme={theme}
							/>
						</Transition>
						<AdvancedOptions>
							<ButtonAdvancedResults theme={theme} onClick={setResetMap}>
								New Map
							</ButtonAdvancedResults>
							<ButtonAdvancedResults theme={theme}>
								<TwitterLink
									onClick={handleShare}
									href={twitterText}
									target='_blank'
									className='twitter-share-button'
									data-show-count='false'>
									Tweet it
								</TwitterLink>
							</ButtonAdvancedResults>
							<ButtonAdvancedResults
								copied={copied}
								theme={theme}
								onClick={handleShare}>
								{copied ? 'Copied!' : 'Clipboard URL'}
							</ButtonAdvancedResults>
						</AdvancedOptions>
					</AutocompleteWrapper>
				</AutocompleteBox>
			</BrowserView>

			<MobileView>
				<AutocompleteWrapperMobile>
					<AutocompleteInputMobile
						onChange={handleInput}
						onKeyDown={handleKeyPress}
						type='text'
						value={inputValue}
						placeholder='Search for a Country'
					/>
					<SearchIconMobile onClick={handleClick} />
					<AutocompleteList
						suggestionList={suggestionList}
						handleSuggestion={handleSuggestion}
						navigationIndex={navigationIndex}
						theme={theme}
					/>
				</AutocompleteWrapperMobile>
				<AdvancedOptionsMobile>
					<ButtonAdvancedResultsMobile theme={theme} onClick={setResetMap}>
						New Map
					</ButtonAdvancedResultsMobile>
					<ButtonAdvancedResultsMobile theme={theme} onClick={handleShare}>
						<TwitterLink
							href={twitterText}
							target='_blank'
							className='twitter-share-button'
							data-show-count='false'>
							Tweet it
						</TwitterLink>
					</ButtonAdvancedResultsMobile>
					<ButtonAdvancedResultsMobile
						copied={copied}
						theme={theme}
						onClick={handleShare}>
						{copied ? 'Copied!' : 'Clipboard URL'}
					</ButtonAdvancedResultsMobile>
				</AdvancedOptionsMobile>
			</MobileView>
		</>
	);
};
export default Autocomplete;
