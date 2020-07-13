import React from 'react';
import styled from 'styled-components';

const AutocompleteListWrapper = styled.div`
	position: absolute;
	padding-left: 1em;
	padding-right: 1em;
	left: 41%;
	background: antiquewhite;
	font-size: 20px;
	width: 9em;
	text-align: center;
	z-index: 99999;
	border-radius: 5px 5px 5px 5px;
`;

const AutocompleteWord = styled.div`
	padding: 0.5em 0;
	border-bottom: 1px solid palevioletred;
	color: black;
	&:hover {
		cursor: pointer;
		color: palevioletred;
	}
	&.active {
		cursor: pointer;
		color: palevioletred;
		background-color: #fdf5ea;
	}
`;

export const AutocompleteList = ({
	suggestionList,
	handleSuggestion,
	navigationIndex,
}) => {
	return (
		<AutocompleteListWrapper>
			{suggestionList
				? Object.keys(suggestionList).map((item, index) => {
						return (
							<AutocompleteWord
								key={`${suggestionList[item].name}+${index}`}
								onClick={() => handleSuggestion(index)}
								className={navigationIndex === index ? 'active' : null}>
								{suggestionList[item].name}
							</AutocompleteWord>
						);
				  })
				: null}
		</AutocompleteListWrapper>
	);
};
