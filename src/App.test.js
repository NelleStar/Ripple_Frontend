import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { apiRipple } from './apiRipple';
import { BrowserRouter } from 'react-router-dom';

it ('renders without crashing', () => {
  render(<App />);
});

it('matches Snapshot', () => {
  const {asFragment} = render(<App />);
  expect(asFragment).toMatchSnapshot()
});

it('renders login link', () => {
  const {getByText} = render(<App />)
  expect(getByText('login')).toBeInTheDocument()
});