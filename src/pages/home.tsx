import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { Platform } from "../types/platform-types";
import { Batch } from "../types/batch-types";
import UsersTable from "../components/users-table";

const platforms: Platform[] = ["CodeForces", "CodeChef"];
const batches: Batch[] = ["Batch 03", "Batch 02"];

export default function HomePage() {
  const [platform, setPlatform] = useState(platforms[0]);
  const [batch, setBatch] = useState(batches[0]);

  return (
    <div className="p-12 max-w-7xl mx-auto flex flex-col gap-3">
      <div className="flex justify-end items-center gap-3">
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

      <UsersTable />
    </div>
  );
}
