export function rebuild<A, B>(fn: (kvp: [string, A]) => [string, B][], obj: Record<string, A>): Record<string, B>;
