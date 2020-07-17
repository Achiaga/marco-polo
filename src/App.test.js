import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('true is truthy and false is falsy', () => {
	test('true is truthy', () => {
		expect(true).toBe(true);
	});

	test('false is falsy', () => {
		expect(false).toBe(false);
	});
});

describe('App', () => {
	test('renders App component', () => {
		render(<App />);

		expect(screen.getByText('MARCO POLO')).toBeInTheDocument();
		expect(screen.getByText(/Developed/)).toBeInTheDocument();
	});
});
