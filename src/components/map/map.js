import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../../utils/custom-hooks';
import Datamap from 'datamaps';

const MapWrapper = styled.div``;

const mapsFunctions = (countryCode, handleClickCountry) => {
	const oldMap = document.getElementById('container');
	const svgChild = oldMap.getElementsByTagName('svg');
	if (svgChild[0]) {
		oldMap.removeChild(svgChild[0]);
	}
	new Datamap({
		element: document.getElementById('container'),
		fills: {
			HIGH: '#f4acb7',
			LOW: '#f4acb7',
			MEDIUM: '#f4acb7',
			UNKNOWN: '#f4acb7',
			defaultFill: '#a8dadc',
		},
		data: countryCode,
		geographyConfig: {
			highlightFillColor: '#f6bd60',
			highlightBorderColor: '#f7ede2',
			popupTemplate: function (geo, data) {
				return [
					'<div class="hoverinfo"><strong>',
					'Country : ' + geo.properties.name,
					'</strong></div>',
				].join('');
			},
		},
		done: function (datamap) {
			datamap.svg
				.selectAll('.datamaps-subunit')
				.on('click', function (geography) {
					const country = geography.id;
					handleClickCountry(country);
				});
		},
	});
};

const Map = ({ countryCode, handleClickCountry }) => {
	const size = useWindowSize();
	useEffect(() => {
		mapsFunctions(countryCode, handleClickCountry);
	}, [size.width]);
	useEffect(() => {
		mapsFunctions(countryCode, handleClickCountry);
	}, [countryCode]);
	const mapWidth = size.width / 1.1;
	return (
		<MapWrapper>
			<div
				id='container'
				style={{
					margin: 'auto',
					position: 'relative',
					width: mapWidth,
					height: mapWidth / 2.24,
				}}
			/>
		</MapWrapper>
	);
};

export default Map;
