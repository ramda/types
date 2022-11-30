import { expectType, expectError } from 'tsd';
import { allPass } from '../types/allPass';
import { propEq } from '../types/propEq';

const isOld = propEq('age', 212);
const isAllergicToGarlic = propEq('garlic_allergy', true);
const isAllergicToSun = propEq('sun_allergy', true);
const isFast = propEq('fast', null);
const isAfraid = propEq('fear', undefined);

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
    fast: false,
    fear: true
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
