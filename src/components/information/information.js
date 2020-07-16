import React from 'react';
import styled from 'styled-components';
import ResultsBox from '../results-box';

const InformationWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 1em;
`;

const BlankSpace = styled.div`
	width: 9vw;
`;

const ResultsWrapper = styled.div`
	padding: 1em;
	width: 30vw;
	z-index: 9999;
`;

const ExplanationCardWrrapper = styled.div`
	width: 35vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const List = styled.ul`
	color: ${(props) => (props.theme === 'light' ? ' black' : ' burlywood')};
	margin: 0;
	font-size: 20px;
	font-weight: 700;
`;

const ListItems = styled.li`
	padding: 0.2em 0;
	font-family: 'Anonymous Pro', monospace;
`;

const Emoji = styled.span`
	font-size: 30px;
`;
const ExplanationCard = styled.div``;

const Information = ({ countryCode, results, theme }) => {
	return (
		<InformationWrapper>
			<BlankSpace />
			<ExplanationCardWrrapper>
				<ExplanationCard>
					<List theme={theme}>
						<ListItems>
							Add visited countries <Emoji>🗺</Emoji>
						</ListItems>
						<ListItems>
							Track your progress <Emoji>🚀</Emoji>
						</ListItems>
						<ListItems>
							Compare against other travelers <Emoji>🛫</Emoji>
						</ListItems>
						<ListItems>
							Share it with other travelers <Emoji>🏝</Emoji>
						</ListItems>
					</List>
				</ExplanationCard>
			</ExplanationCardWrrapper>
			<ResultsWrapper>
				<ResultsBox countryCode={countryCode} results={results} theme={theme} />
			</ResultsWrapper>
		</InformationWrapper>
	);
};

export default Information;
