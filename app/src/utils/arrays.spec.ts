import { isSubArray, zip } from './arrays';

import { parametrize } from '../tests/runners';

xdescribe('zip', () => parametrize(zip, []));
xdescribe('isSubArray', () => parametrize(isSubArray, []));
