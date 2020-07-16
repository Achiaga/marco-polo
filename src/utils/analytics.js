import React from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

export const InitializeAnalytics = () => {
	if (!process.env.GA_KEY) throw new Error('localhost');
	const trackingId = process.env.GA_KEY || '';
	ReactGA.initialize(trackingId);
	ReactGA.pageview('/');
	(function (h, o, t, j, a, r) {
		h.hj =
			h.hj ||
			function () {
				(h.hj.q = h.hj.q || []).push(arguments);
			};
		h._hjSettings = { hjid: process.env.HOTJAR_KEY || 0, hjsv: 6 };
		a = o.getElementsByTagName('head')[0];
		r = o.createElement('script');
		r.async = 1;
		r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
		a.appendChild(r);
	})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
};

export const AnalyticsEvent = (category, action) => {
	ReactGA.event({
		category: category,
		action: action,
	});
};
