"use client";
import ChangeNameModal from "@/lib/component/ChangeNameModal";
import { Participant } from "@prisma/client";
import { Button, Card, Table } from "flowbite-react";
import { useEffect } from "react";
import useSWR from "swr";
import { generateUsername } from "unique-username-generator";

export default function Page({ params }: { params: { name: string } }) {
  let name: string | null = "";
  if (typeof window !== "undefined") {
    name = window.localStorage.getItem("name");
    if (name === null) {
      name = generateUsername(" ");
      window.localStorage.setItem("name", name);
    }
  }

  const fetcher = () =>
    fetch(`/api/room/${params.name}`).then((res) => res.json());
  let { data, error, isLoading } = useSWR("/api/room", fetcher, {
    refreshInterval: 1,
  });

  function handleClick(value: string) {
    // I don't know why the the first parameter is not found by nextjs, so I use p as a dummy
    fetch(`/api/room/${params.name}/${name}?p&estimation=${value}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    console.log(`Click on ${value}`);
  }

  function deleteEstimation() {
    console.log("Delete Estimations");
    fetch(`/api/room/${params.name}/${name}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }
  function toggleShowResults() {
    data.room.show = !data.room.show;
    fetch(`/api/room/${params.name}/?p&show=${!data.show}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }
  function edit() {
    console.log("EDIT");
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="mt-6 w-2/3">
      <h2 className="flex text-2xl dark:text-white">
        Hi <span className="px-1 font-bold">{name}</span>
        <ChangeNameModal />
      </h2>
      <span className="dark:text-white">
        You are in room <span className="font-bold">{data.room.name}</span>
      </span>

      <div className="mt-8 flex flex-wrap justify-center space-x-2">
        {data.room.cards.map(function (value: string) {
          return (
            <Card
              key={value}
              onClick={() => handleClick(value)}
              className="w-[90px]"
            >
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {value}
              </h5>
            </Card>
          );
        })}
      </div>

      <h3 className="mb-6 mt-12 text-xl font-bold dark:text-white">Results:</h3>
      <div className="my-2 flex justify-between">
        <Button onClick={() => deleteEstimation()}>Delete estimations</Button>
        <Button onClick={() => toggleShowResults()} color="light">
          Show
        </Button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Story Points</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data.room.participant?.map(function (participant: Participant) {
            let estimation;
            if (data.room.show) {
              estimation = <Table.Cell>{participant.estimate}</Table.Cell>;
            } else {
              if (participant.estimate !== "X") {
                // Estimated
                estimation = (
                  <Table.Cell>
                    <svg
                      className="size-6 fill-green-600 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  </Table.Cell>
                );
              } else {
                // Not estimated
                estimation = (
                  <Table.Cell>
                    <svg
                      className="size-6 fill-primary-600 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                    </svg>
                  </Table.Cell>
                );
              }
            }
            return (
              <Table.Row key={participant.id}>
                <Table.Cell>{participant.name}</Table.Cell>
                {estimation}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
