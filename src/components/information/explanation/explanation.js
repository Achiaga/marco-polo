import React from 'react';
import styled from 'styled-components';
import { BrowserView, MobileView } from 'react-device-detect';

const ExplanationCard = styled.div``;

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

const ListMobile = styled.ul`
	color: ${(props) => (props.theme === 'light' ? ' black' : ' burlywood')};
	margin: 0;
	font-size: 15px;
	font-weight: 700;
`;

const ListItemsMobile = styled.li`
	padding: 0.2em 0;
	font-family: 'Anonymous Pro', monospace;
`;

const EmojiMobile = styled.span`
	font-size: 25px;
`;

const Explanation = ({ theme }) => {
	return (
		<ExplanationCard>
			<BrowserView>
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
			</BrowserView>
			<MobileView>
				<ListMobile theme={theme}>
					<ListItemsMobile>
						Add visited countries <EmojiMobile>🗺</EmojiMobile>
					</ListItemsMobile>
					<ListItemsMobile>
						Track your progress <EmojiMobile>🚀</EmojiMobile>
					</ListItemsMobile>
					<ListItemsMobile>
						Compare against other travelers <EmojiMobile>🛫</EmojiMobile>
					</ListItemsMobile>
					<ListItemsMobile>
						Share it with other travelers <EmojiMobile>🏝</EmojiMobile>
					</ListItemsMobile>
				</ListMobile>
			</MobileView>
		</ExplanationCard>
	);
};

export default Explanation;
