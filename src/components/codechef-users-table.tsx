import { Avatar, Table } from "flowbite-react";
import { Batch } from "../types/batch-types";
import { codeChefUsernames } from "../utils/codechef-users";
import { codeChefProfileLink } from "../utils/links";
import { redirectTo } from "../utils/redirect";
import { PuffLoader, PulseLoader } from "react-spinners";
import { AiFillStar } from "react-icons/ai";
import { BiSortDown } from "react-icons/bi";
import { useState } from "react";
import useCodeChefUsers from "../hooks/use-codechef-users";

type Props = {
  batch: Batch;
};

type SortType = "RATING" | "MAX_RATING";

export default function CodeChefUsersTable({ batch }: Props) {
  const [sort, setSort] = useState<SortType>("RATING");

  const { data: users, isLoading } = useCodeChefUsers(batch);

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
            <span>Highest Rating </span>
            {sort === "MAX_RATING" ? <BiSortDown className="text-xl" /> : null}
          </h3>
        </Table.HeadCell>
        <Table.HeadCell className="text-base">Country Rank</Table.HeadCell>
        <Table.HeadCell className="text-base">Global Rank</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {codeChefUsernames[batch]
          .sort((u1, u2) => {
            let x = users?.[u1]?.rating || 0;
            let y = users?.[u2]?.rating || 0;

            if (sort === "MAX_RATING") {
              x = users?.[u1]?.highestRating || 0;
              y = users?.[u2]?.highestRating || 0;
            }

            return y - x;
          })
          .map((username, i) => {
            const user = users?.[username];
            const stars = user?.stars || 0;

            return (
              <Table.Row key={username}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <div className="select-none rounded overflow-hidden">
                      <Avatar
                        size="sm"
                        placeholderInitials={(
                          user?.name?.[0] || username[0]
                        ).toUpperCase()}
                      />
                    </div>
                    <h4
                      className="inline-flex flex-col hover:opacity-70 cursor-pointer"
                      onClick={() => redirectTo(codeChefProfileLink(username))}
                    >
                      <div className="text-base">
                        {isLoading ? (
                          <PulseLoader color="#aaa" size={12} />
                        ) : (
                          <div className="flex items-center gap-1">
                            <span>{user?.name || "Not Available"}</span>
                            <span className="flex items-center">
                              {Array(stars).fill(null).map(() => <AiFillStar key={Math.random()} />)}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{username}</span>
                    </h4>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {isLoading ? (
                    <PuffLoader color="#aaa" size={24} />
                  ) : (
                    user?.rating || "N/A"
                  )}
                </Table.Cell>
                <Table.Cell>
                  {isLoading ? (
                    <PuffLoader color="#aaa" size={24} />
                  ) : (
                    user?.highestRating || "N/A"
                  )}
                </Table.Cell>
                <Table.Cell>
                  {isLoading ? (
                    <PuffLoader color="#aaa" size={24} />
                  ) : (
                    user?.countryRank || "N/A"
                  )}
                </Table.Cell>
                <Table.Cell>
                  {isLoading ? (
                    <PuffLoader color="#aaa" size={24} />
                  ) : (
                    user?.globalRank || "N/A"
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
}
