import React from 'react';
import styled from 'styled-components';

const AutocompleteListWrapper = styled.div`
	position: absolute;
	background: antiquewhite;
	background: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
	font-size: 20px;
	width: 80%;
	padding: 0 10%;
	text-align: center;
	border-radius: 5px 5px 5px 5px;
	top: 0px;
	transform: translate(0px, 40px);
	z-index: 9999;
	box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
`;

const AutocompleteWord = styled.div`
	padding: 0.5em 0;
	border-bottom: 1px solid palevioletred;
	color: ${(props) => (props.theme === 'light' ? 'white' : 'palevioletred')};
	&:hover {
		cursor: pointer;
		color: palevioletred;
	}
	&.active {
		cursor: pointer;
		color: ${(props) => (props.theme === 'light' ? 'palevioletred' : 'black')};
		background-color: #fdf5ea;
		background-color: ${(props) =>
			props.theme === 'light' ? 'black' : 'white'};
	}
	&#last  {
		border-bottom: none;
	}
`;

export const AutocompleteList = ({
	suggestionList,
	handleSuggestion,
	navigationIndex,
	theme,
}) => {
	return (
		<AutocompleteListWrapper theme={theme}>
			{suggestionList
				? suggestionList.map((item, index) => {
						return (
							<AutocompleteWord
								theme={theme}
								key={`${suggestionList[index]}+${index}`}
								onClick={() => handleSuggestion(item)}
								id={index === suggestionList.length - 1 ? 'last' : null}
								className={navigationIndex === index ? 'active' : null}>
								{item}
							</AutocompleteWord>
						);
				  })
				: null}
		</AutocompleteListWrapper>
	);
};
