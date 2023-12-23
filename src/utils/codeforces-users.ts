import { BATCH2, BATCH3 } from "../types/batch-types";

const batch2 = new Set(import.meta.env.VITE_CODEFORCES_USERNAMES_BATCH02.split(","));
const batch3 = new Set(import.meta.env.VITE_CODEFORCES_USERNAMES_BATCH03.split(","));

export const codeForcesUsernames = {
	[BATCH3]: Array.from(batch3) as string[],
	[BATCH2]: Array.from(batch2) as string[],
};
