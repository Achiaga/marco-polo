import React from 'react';
import styled from 'styled-components';

const CreditsWrapper = styled.div`
	display: grid;
	justify-content: center;
	text-align: center;
	margin-bottom: 1.5em;
	color: palevioletred;
`;
const Credits = styled.span`
	font-size: 20px;
	padding: 0;
`;

const Footer = () => {
	return (
		<CreditsWrapper>
			<Credits>Developed it by @bender_dev</Credits>
			<Credits>
				If you want me to continue developing it, you can support it with:{' '}
				<a href='https://www.buymeacoffee.com/benderdev' target='_blank'>
					<img
						src='https://cdn.buymeacoffee.com/buttons/default-orange.png'
						alt='Buy Me A Coffee'
						style={{
							height: '40px ',
							width: '155px ',
						}}
					/>
				</a>
			</Credits>
		</CreditsWrapper>
	);
};

export default Footer;
