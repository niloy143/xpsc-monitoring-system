import { Table } from "flowbite-react";
import { Batch } from "../types/batch-types";
import { codeChefUsernames } from "../utils/codechef-users";

type Props = {
  batch: Batch;
};

export default function CodeChefUsersTable({ batch }: Props) {
  return (
    <Table striped className="dark text-gray-300 text-base">
      <Table.Head>
        <Table.HeadCell>
          <h4 className="flex flex-col">
            <span className="text-base">Full Name</span>
            <span className="text-xs">username</span>
          </h4>
        </Table.HeadCell>
        <Table.HeadCell className="text-base">Rating</Table.HeadCell>
        <Table.HeadCell className="text-base">Max Rating</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {codeChefUsernames[batch].map((username) => {
          return (
            <Table.Row key={username}>
              <Table.Cell>
                <h4 className="flex flex-col">
                  <span className="text-base">Full Name</span>
                  <span className="text-xs text-gray-400">{username}</span>
                </h4>
              </Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
