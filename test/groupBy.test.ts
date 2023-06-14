import { groupBy } from '../es';

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
(grouped.C ?? []).length;
// @ts-expect-error
grouped.C.length;
