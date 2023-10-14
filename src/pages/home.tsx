import { Dropdown } from "flowbite-react";
import { useState } from "react";
import CodeForcesUsersTable from "../components/codeforces-users-table";
import { platforms } from "../types/platform-types";
import { batches } from "../types/batch-types";
import CodeChefUsersTable from "../components/codechef-users-table";
import useCodeChefUsers from "../hooks/use-codechef-users";
import useCodeForcesUsers from "../hooks/use-codeforces-users";

export default function HomePage() {
  const [platform, setPlatform] = useState(platforms[0]);
  const [batch, setBatch] = useState(batches[0]);

  useCodeChefUsers(batch);
  useCodeForcesUsers(batch);

  return (
    <div className="p-12 max-w-7xl mx-auto flex flex-col gap-3 relative">
      <div className="flex justify-end items-center gap-3 sticky top-2 z-50">
        <Dropdown label={platform}>
          {platforms.map((platform, i) => {
            return (
              <Dropdown.Item
                key={platform + i}
                onClick={() => setPlatform(platform)}
              >
                {platform}
              </Dropdown.Item>
            );
          })}
        </Dropdown>
        <Dropdown label={batch}>
          {batches.map((batch, i) => {
            return (
              <Dropdown.Item key={batch + i} onClick={() => setBatch(batch)}>
                {batch}
              </Dropdown.Item>
            );
          })}
        </Dropdown>
      </div>

      {platform === "CodeForces" ? (
        <CodeForcesUsersTable batch={batch} />
      ) : platform === "CodeChef" ? (
        <CodeChefUsersTable batch={batch} />
      ) : (
        <></>
      )}
    </div>
  );
}
