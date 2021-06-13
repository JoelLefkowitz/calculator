import { getElementById } from './dom';
import { parametrize } from '../tests/runners';

xdescribe('getElementById', () => parametrize(getElementById, []));
