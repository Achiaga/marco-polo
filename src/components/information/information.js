import React from 'react';
import styled from 'styled-components';
import ResultsBox from './results/results-box';
import Explanation from './explanation/explanation';
import { BrowserView, MobileView } from 'react-device-detect';

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
	z-index: -1;
`;

const ExplanationCardWrrapper = styled.div`
	width: 35vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const InformationWrapperMobile = styled.div`
	margin-bottom: 1em;
`;

const ResultsWrapperMobile = styled.div`
	width: 100%;
`;

const ExplanationCardWrrapperMobile = styled.div`
	width: 95%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Information = ({ countryCode, results, theme }) => {
	return (
		<>
			<BrowserView>
				<InformationWrapper>
					<BlankSpace />
					<ExplanationCardWrrapper>
						<Explanation theme={theme} />
					</ExplanationCardWrrapper>
					<ResultsWrapper>
						<ResultsBox
							countryCode={countryCode}
							results={results}
							theme={theme}
						/>
					</ResultsWrapper>
				</InformationWrapper>
			</BrowserView>
			<MobileView>
				<InformationWrapperMobile>
					<ExplanationCardWrrapperMobile>
						<Explanation theme={theme} />
					</ExplanationCardWrrapperMobile>
					<ResultsWrapperMobile>
						<ResultsBox
							countryCode={countryCode}
							results={results}
							theme={theme}
						/>
					</ResultsWrapperMobile>
				</InformationWrapperMobile>
			</MobileView>
		</>
	);
};

export default Information;
