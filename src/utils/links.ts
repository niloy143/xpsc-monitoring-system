const codeChefAPI = import.meta.env.VITE_CODE_CHEF_API;

export function codeForcesProfileLink(username: string) {
    return `https://codeforces.com/profile/${username}`
}

export function codeChefProfileLink(username: string) {
    return `https://www.codechef.com/users/${username}`
}

export function codeForcesUserAPI(handles: string[]) {
    return `https://codeforces.com/api/user.info?handles=${handles.join(";")}`
}

export function codeChefUserAPI(usernames: string[]) {
    return `${codeChefAPI}/users?usernames=${usernames.join(",")}`;
}