import { Batch } from "../types/batch-types";
import bulkAsync from "../utils/bulk-async";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CodeChefUser } from "../types/codechef-user";
import { codeChefUserAPI } from "../utils/links";
import { codeChefUsernames } from "../utils/codechef-users";

type UsersResult = {
    data: CodeChefUser;
};

type UsersData = {
    [key: string]: CodeChefUser | undefined | null;
};

const useCodeChefUsers = (batch: Batch) => useQuery({
    queryKey: [batch, "codechef"],
    queryFn: async () => {
        const actions = codeChefUsernames[batch].map((username) => {
            return async () =>
                axios.get(codeChefUserAPI(username)).then(({ data }) => data);
        });
        const data = await bulkAsync<UsersResult>(actions);
        const newData: UsersData = {};
        data.result.forEach((data) => {
            const user = data.data?.data;
            if (user?.username) newData[user.username] = user;
        });

        return newData;
    },
});

export default useCodeChefUsers;