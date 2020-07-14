import React, { useState, useCallback, useEffect } from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import sunIcon from '../../assets/sun.png';
import moonIcon from '../../assets/moon.png';

const CheckBoxWrapper = styled.div`
	position: relative;
`;
const CheckBoxLabel = styled.label`
	position: absolute;
	top: 0;
	left: 0;
	width: 60px;
	height: 26px;
	border-radius: 15px;
	background: skyblue;
	cursor: pointer;
	&::after {
		content: '';
		display: block;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		margin: 4px;
		background: white;
		transition: 0.2s;
	}
`;
const CheckBox = styled.input`
	opacity: 0;
	z-index: 1;
	border-radius: 15px;
	width: 60px;
	height: 26px;
	&:checked + ${CheckBoxLabel} {
		background: ${(props) => (props.checked ? 'black' : 'skyblue')};
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 18px;
			height: 18px;
			margin-left: 35px;
			transition: 0.2s;
			z-index: 2;
		}
	}
`;

const MoonIcon = styled.img`
	width: 17px;
	position: absolute;
	left: 6px;
	top: 4px;
`;
const SunIcon = styled.img`
	width: 22px;
	position: absolute;
	left: 32px;
	top: 2px;
`;

const isDark = ({ mode }) => {
	return mode === 'dark';
};

const Button = styled.button`
	background: ${({ theme }) => theme.background};
	border: 2px solid ${({ theme }) => theme.toggleBorder};
	color: ${({ theme }) => theme.text};
	border-radius: 30px;
	cursor: pointer;
	font-size: 0.8rem;
	padding: 0.6rem;
`;

const Toggle = ({ theme, toggleTheme }) => {
	const [dark, setdark] = useState(false);

	const handleChange = useCallback(() => {
		setdark(!dark);
		toggleTheme();
	});

	return (
		<CheckBoxWrapper>
			<CheckBox
				id='checkbox'
				type='checkbox'
				checked={dark}
				onChange={handleChange}
			/>
			<CheckBoxLabel htmlFor='checkbox' />
			{dark ? <MoonIcon src={moonIcon} /> : <SunIcon src={sunIcon} />}
		</CheckBoxWrapper>
	);
};

export default Toggle;
