import React from 'react';
import styled from 'styled-components';

const InformationMapWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	margin-bottom: 3em;
	font-size: 26px;
`;

const InformationBox = styled.div`
	width: 33%;
	height: 3em;
	text-align: center;
	border-right: 1px solid white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InformationMap = () => {
	return (
		<InformationMapWrapper>
			<InformationBox>
				27 <br /> COUNTRIES
			</InformationBox>
			<InformationBox>
				20% <br /> of the world explored
			</InformationBox>
			<InformationBox>Young Scout 🐿</InformationBox>
		</InformationMapWrapper>
	);
};

export default InformationMap;
