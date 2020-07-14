import React from 'react';
import styled from 'styled-components';

const AutocompleteListWrapper = styled.div`
	position: absolute;
	background: antiquewhite;
	font-size: 20px;
	width: 80%;
	padding: 0 10%;
	text-align: center;
	border-radius: 5px 5px 5px 5px;
	top: 0px;
	transform: translate(0px, 40px);
	z-index: 9999;
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
	&#last  {
		border-bottom: none;
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
				? suggestionList.map((item, index) => {
						return (
							<AutocompleteWord
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
