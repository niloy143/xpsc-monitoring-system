import { useQuery } from "@tanstack/react-query";
import { Batch } from "../types/batch-types";
import { CodeForcesUser } from "../types/codeforces-user";
import axios from "axios";
import { codeForcesUserAPI } from "../utils/links";
import { codeForcesUsernames } from "../utils/codeforces-users";

type UsersResult = {
    status: string;
    result: CodeForcesUser[];
};

type UsersData = {
    [key: string]: CodeForcesUser;
};

const useCodeForcesUsers = (batch: Batch) => useQuery({
    queryKey: [batch, "codeforces"],
    queryFn: async () => {
        const { data } = await axios.get<UsersResult>(
            codeForcesUserAPI(codeForcesUsernames[batch])
        );

        const newData: UsersData = {};
        data?.result?.forEach((user) => {
            newData[user.handle!] = user;
        });

        return newData;
    },
});

export default useCodeForcesUsers;