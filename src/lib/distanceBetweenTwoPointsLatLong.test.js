import { getDistance } from './distanceBetweenTwoPointsLatLong';

test('should return correct distance ', () => {
  expect(getDistance(1.355982, 103.845712, 1.358556, 103.845029)).toEqual(
    '296m away'
  );
  expect(getDistance(1.355982, 103.845712, 1.365792, 103.848342)).toEqual(
    '1.1km away'
  );
});
