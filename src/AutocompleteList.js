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
`;

export const AutocompleteList = ({ suggestionList }) => {
	console.log(suggestionList);
	return (
		<AutocompleteListWrapper>
			{suggestionList
				? suggestionList.map((item) => {
						return <AutocompleteWord key={item}>{item}</AutocompleteWord>;
				  })
				: null}
		</AutocompleteListWrapper>
	);
};
