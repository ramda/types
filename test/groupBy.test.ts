import { expectError, expectType } from 'tsd';
import { toPairs, groupBy, __ } from '../es';

type Student = { score: number; name: string };

const byGrade = groupBy((student: Student) => {
  const score = student.score;
  return score < 65 ? 'F' : score < 70 ? 'D' : score < 80 ? 'C' : score < 90 ? 'B' : 'A';
});

const students = [
  { name: 'Abby', score: 84 },
  { name: 'Eddy', score: 58 },
  { name: 'Jack', score: 69 }
];

expectType<Record<'A' | 'B' | 'C' | 'D' | 'F', Student[]>>(byGrade(students));

// accepts a placeholder and later specifying the grouping function

const byGrade2 = groupBy(__, students);
const grouped2 = byGrade2((student: Student) => {
  const score = student.score;
  return score < 65 ? 'F' : score < 70 ? 'D' : score < 80 ? 'C' : score < 90 ? 'B' : 'A';
});
expectType<Record<'A' | 'B' | 'C' | 'D' | 'F', Student[]>>(grouped2);

// toPairs returns expected
const entries = toPairs({} as Record<string, Student[]>);
expectType<[string, Student[]][]>(entries);
expectError<[string, Student[] | undefined][]>(entries); // this assertion was true before when groupBy returned `Partial<Record<>>`
