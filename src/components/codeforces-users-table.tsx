import { Table } from "flowbite-react";
import { CodeForcesUser } from "../types/codeforces-user";

type Props = {
  users: CodeForcesUser[];
};

export default function CodeForcesUsersTable({ users }: Props) {
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
        {users.map((user, i) => {
          return (
            <Table.Row key={`${user.handle}` + i}>
              <Table.Cell>
                <h4 className="flex flex-col">
                  <span className="text-base">
                    {`${user.firstName || "First Name"} ${
                      user.lastName || "Last Name"
                    }`}
                  </span>
                  <span className="text-xs text-gray-400">{`${
                    user.handle || "Handle"
                  }`}</span>
                </h4>
              </Table.Cell>
              <Table.Cell>{`${user.rating || "0"}`}</Table.Cell>
              <Table.Cell>{`${user.maxRating || "0"}`}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
