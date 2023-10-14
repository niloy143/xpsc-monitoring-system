export function codeForcesProfileLink(username: string) {
    return `https://codeforces.com/profile/${username}`
}

export function codeChefProfileLink(username: string) {
    return `https://www.codechef.com/users/${username}`
}

export function codeForcesUserAPI(handles: string[]) {
    return `https://codeforces.com/api/user.info?handles=${handles.join(";")}`
}

export function codeChefUserAPI(username: string) {
    return `https://codechef-cards-api.onrender.com/${username}`;
}