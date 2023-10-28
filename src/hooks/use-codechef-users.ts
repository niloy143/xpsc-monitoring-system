import { Batch } from "../types/batch-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CodeChefUser } from "../types/codechef-user";
import { codeChefUserAPI } from "../utils/links";
import { codeChefUsernames } from "../utils/codechef-users";

type UsersResult = {
    data: CodeChefUser[];
};

type UsersData = {
    [key: string]: CodeChefUser | undefined | null;
};

const useCodeChefUsers = (batch: Batch) => useQuery({
    queryKey: [batch, "codechef"],
    queryFn: async () => {
        const users: UsersData = {};

        const { data } = await axios.get<UsersResult>(codeChefUserAPI(codeChefUsernames[batch]));

        if (data?.data?.length > 0) {
            for (const user of data.data) {
                if (user.username)
                    users[user.username] = user;
            }
        }

        return users;
    },
});

export default useCodeChefUsers;