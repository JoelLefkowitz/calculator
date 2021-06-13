import { hasUnrepeatedKeyClash, isRepeatableKey } from './keys';

import { parametrize } from '../tests/runners';

xdescribe('isRepeatableKey', () => parametrize(isRepeatableKey, []));
xdescribe('hasUnrepeatedKeyClash', () =>
  parametrize(hasUnrepeatedKeyClash, []));
