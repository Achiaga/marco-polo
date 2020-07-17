import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BrowserView, MobileView } from 'react-device-detect';

const blowup = keyframes`
  0% {
	transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const AutocompleteListWrapper = styled.div`
	position: absolute;
	background: antiquewhite;
	font-size: 14px;
	width: 80%;
	padding: 0 10%;
	text-align: center;
	border-radius: 5px 5px 5px 5px;
	top: -7px;
	left: 0;
	transform: translate(0px, 40px);
	animation: ${blowup} 1s;
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
	&#last {
		border-bottom: none;
	}
`;

const AutocompleteListWrapperMobile = styled.div`
	position: absolute;
	background: antiquewhite;
	font-size: 20px;
	width: 80%;
	padding: 0 10%;
	text-align: center;
	border-radius: 5px 5px 5px 5px;
	top: 16px;
	left: -10px;
	transform: translate(0px, 40px);
	z-index: 9999;
`;

const AutocompleteWordMobile = styled.div`
	padding: 0.5em 0;
	border-bottom: 1px solid palevioletred;
	color: black;
	&:hover {
		cursor: pointer;
		color: palevioletred;
	}
	&#last {
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
		<>
			<BrowserView>
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
			</BrowserView>
			<MobileView>
				<AutocompleteListWrapperMobile theme={theme}>
					{suggestionList
						? suggestionList.map((item, index) => {
								return (
									<AutocompleteWordMobile
										theme={theme}
										key={`${suggestionList[index]}+${index}`}
										onClick={() => handleSuggestion(item)}
										id={index === suggestionList.length - 1 ? 'last' : null}
										className={navigationIndex === index ? 'active' : null}>
										{item}
									</AutocompleteWordMobile>
								);
						  })
						: null}
				</AutocompleteListWrapperMobile>
			</MobileView>
		</>
	);
};
