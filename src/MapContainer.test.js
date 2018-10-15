import React from 'react';
import { render } from 'react-testing-library';
import MapContainer from './MapContainer';

test('should render map', () => {
  const { container, debug } = render(<MapContainer />);
  const map = container.querySelector('.map');
  debug();
  expect(map).toBeInTheDocument();
});
