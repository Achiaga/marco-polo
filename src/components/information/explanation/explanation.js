import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
	color: ${(props) => (props.theme === 'light' ? ' black' : ' burlywood')};
	margin: 0;
	font-size: 15px;
	font-weight: 700;
`;

const ListItems = styled.li`
	padding: 0.2em 0;
	font-family: 'Anonymous Pro', monospace;
`;

const Emoji = styled.span`
	font-size: 25px;
`;
const ExplanationCard = styled.div``;

const Explanation = ({ theme }) => {
	return (
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
	);
};

export default Explanation;
