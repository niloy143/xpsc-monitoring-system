import { Avatar, Table, Tooltip } from "flowbite-react";
import { Batch } from "../types/batch-types";
import { codeForcesUsernames } from "../utils/codeforces-users";
import { useQuery } from "@tanstack/react-query";
import { PulseLoader, PuffLoader } from "react-spinners";
import axios from "axios";
import { CodeForcesUser } from "../types/codeforces-user";
import { redirectTo } from "../utils/redirect";
import { codeForcesProfileLink, codeForcesUserAPI } from "../utils/links";
import { BiSortDown } from "react-icons/bi";
import { useState } from "react";

type Props = {
  batch: Batch;
};

type UsersResult = {
  status: string;
  result: CodeForcesUser[];
};

type UsersData = {
  [key: string]: CodeForcesUser;
};

type SortType = "RATING" | "MAX_RATING";

export default function CodeForcesUsersTable({ batch }: Props) {
  const [sort, setSort] = useState<SortType>("RATING");
  const { data: users, isLoading } = useQuery({
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

  return (
    <Table striped className="dark text-gray-300 text-base">
      <Table.Head>
        <Table.HeadCell className="text-base max-w-[75px]">NO.</Table.HeadCell>
        <Table.HeadCell className="text-base">Candidate</Table.HeadCell>
        <Table.HeadCell className="text-base">
          <h3
            className="inline-flex items-center gap-2 cursor-pointer"
            onClick={() => setSort("RATING")}
          >
            <span>Rating </span>
            {sort === "RATING" ? <BiSortDown className="text-xl" /> : null}
          </h3>
        </Table.HeadCell>
        <Table.HeadCell className="text-base">
          <h3
            className="inline-flex items-center gap-2 cursor-pointer"
            onClick={() => setSort("MAX_RATING")}
          >
            <span>Max Rating </span>
            {sort === "MAX_RATING" ? <BiSortDown className="text-xl" /> : null}
          </h3>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {codeForcesUsernames[batch]
          .sort((u1, u2) => {
            let x = users?.[u1]?.rating || 0;
            let y = users?.[u2]?.rating || 0;

            if (sort === "MAX_RATING") {
              x = users?.[u1]?.maxRating || 0;
              y = users?.[u2]?.maxRating || 0;
            }

            return y - x;
          })
          .map((username, i) => {
            const user = users?.[username];
            let fullName = `${user?.firstName || ""} ${user?.lastName || ""}`;
            if (!fullName.trim()) fullName = "";

            return (
              <Table.Row key={username}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <div className="select-none rounded overflow-hidden">
                      <Tooltip
                        content={`${user?.rank || "unrated"} ${fullName}`}
                      >
                        <Avatar
                          size="sm"
                          placeholderInitials={(
                            fullName?.[0] || username[0]
                          ).toUpperCase()}
                          img={`${user?.avatar || ""}`}
                        />
                      </Tooltip>
                    </div>
                    <h4
                      className="inline-flex flex-col hover:opacity-70 cursor-pointer"
                      onClick={() =>
                        redirectTo(codeForcesProfileLink(username))
                      }
                    >
                      <span className="text-base">
                        {isLoading ? (
                          <PulseLoader color="#aaa" size={12} />
                        ) : (
                          fullName || "Not Available"
                        )}
                      </span>
                      <span className="text-xs text-gray-400">{username}</span>
                    </h4>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {isLoading ? (
                    <PuffLoader color="#aaa" size={24} />
                  ) : (
                    (user?.rating || "N/A") +
                    " " +
                    `(${user?.rank || "unrated"})`
                  )}
                </Table.Cell>
                <Table.Cell>
                  {isLoading ? (
                    <PuffLoader color="#aaa" size={24} />
                  ) : (
                    (user?.maxRating || "N/A") +
                    " " +
                    `(${user?.maxRank || "unrated"})`
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
}
