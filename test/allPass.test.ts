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

const isQueen = propEq('Q', 'rank');
const isSpade = propEq('♠︎', 'suit');
const isQueenOfSpades = allPass([isQueen, isSpade]);

isQueenOfSpades({
  rank: '2',
  suit: '♠︎'
});

const isQueen2 = (x: Record<'rank', string>) => x.rank === 'Q';
const isSpade2 = (x: Record<'suit', string>) => x.suit === '♠︎';
const isQueenOfSpades2 = allPass([isQueen2, isSpade2]);

isQueenOfSpades2({
  rank: '2',
  suit: '♠︎'
});
