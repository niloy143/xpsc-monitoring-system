export type CodeChefUser = {
    username?: string | null,
    name?: string | null,
    isActiveUser?: boolean | null,
    rating?: number | null,
    highestRating?: number | null,
    stars?: number | null,
    globalRank?: number | null,
    countryRank?: number | null,
    problemFullySolved?: number | null,
    problemPartiallySolved?: number | null,
    contestParticipated?: number | null,
    country?: string | null,
    [key: string]: string | number | undefined | null | boolean
}