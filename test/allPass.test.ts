import { expectType, expectError } from 'tsd';
import { allPass, propEq } from '../es';

const isOld = propEq(212, 'age');
const isAllergicToGarlic = propEq(true, 'garlic_allergy');
const isAllergicToSun = propEq(true, 'sun_allergy');
const isFast = propEq(null, 'fast');
const isAfraid = propEq(undefined, 'fear');

const isVampire = allPass([
  isOld,
  isAllergicToGarlic,
  isAllergicToSun,
  isFast,
  isAfraid
]);

expectType<boolean>(
  isVampire({
    age: 212,
    garlic_allergy: true,
    sun_allergy: true,
    fast: null,
    fear: undefined
  })
);

expectType<boolean>(
  isVampire({
    age: 21,
    garlic_allergy: true,
    sun_allergy: true,
    fast: null,
    fear: undefined
  })
);

expectError(
  isVampire({
    age: 40,
    garlic_allergy: true,
    fear: false
  })
);

expectError(
  isVampire({
    nickname: 'Blade'
  })
);
