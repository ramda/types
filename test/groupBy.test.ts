import { expectType } from 'tsd';
import { groupBy, __ } from '../es';

// returns optional arrays for the groups

const byGrade = groupBy((student: { score: number; name: string }) => {
  const score = student.score;
  return score < 65 ? 'F' : score < 70 ? 'D' : score < 80 ? 'C' : score < 90 ? 'B' : 'A';
});
const students = [
  { name: 'Abby', score: 84 },
  { name: 'Eddy', score: 58 },
  { name: 'Jack', score: 69 }
];

const grouped = byGrade(students);
expectType<{ score: number; name: string }[]>(grouped.C);
grouped.C.length;

// accepts a placeholder and later specifying the grouping function

const byGrade2 = groupBy(__, students);
const grouped2 = byGrade2((student: { score: number; name: string }) => {
  const score = student.score;
  return score < 65 ? 'F' : score < 70 ? 'D' : score < 80 ? 'C' : score < 90 ? 'B' : 'A';
});
expectType<{ score: number; name: string }[]>(grouped2.C);
