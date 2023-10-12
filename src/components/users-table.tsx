import { Table } from "flowbite-react";
import { codeForcesUsers } from "../utils/mock-data";

export default function UsersTable() {
  return (
    <Table striped className="dark">
      <Table.Head>
        <Table.HeadCell>Full Name</Table.HeadCell>
        <Table.HeadCell>username</Table.HeadCell>
        <Table.HeadCell>Rating</Table.HeadCell>
        <Table.HeadCell>Max Rating</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {codeForcesUsers.map((user, i) => {
          return (
            <Table.Row key={`${user.handle}` + i}>
              <Table.Cell>{`${user.firstName || "First Name"} ${
                user.lastName || "Last Name"
              }`}</Table.Cell>
              <Table.Cell>{`${user.handle || "Handle"}`}</Table.Cell>
              <Table.Cell>{`${user.rating || "0"}`}</Table.Cell>
              <Table.Cell>{`${user.maxRating || "0"}`}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
