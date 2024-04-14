"use client";
import { Button, Card, Table } from "flowbite-react";
import useSWR from "swr";

export default function Page({ params }: { params: { name: string } }) {
  let name = "alex";
  const fetcher = () =>
    fetch(`/api/room/${params.name}`).then((res) => res.json());
  let { data, error, isLoading } = useSWR("/api/room", fetcher, {
    refreshInterval: 1,
  });

  function handleClick(value: string) {
    // I don't know why the the first parameter is not found by nextjs, so I use p as a dummy
    fetch(`/api/room/${params.name}/?p&name=${name}&estimation=${value}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    console.log(`Click on ${value}`);
  }

  function deleteEstimation() {
    console.log("Delete Estimations");
  }
  function toggleShowResults() {
    console.log("Delete Estimations");
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="mt-6 w-2/3">
      <h2 className="text-2xl dark:text-white">
        Hi <span className="font-bold">{data.room.name}</span>
      </h2>
      {/* <Name
	show={showNameModal}
	on:submit={(e) => {
		name.set(e.detail.name);
		handleClick('X');
		showNameModal = false;
	}}
/> */}
      <div className="mt-8 flex flex-wrap justify-center space-x-2">
        {data.room.cards.map(function (object: any) {
          return (
            <Card
              onClick={() => handleClick(object)}
              className="p-auto w-[90px]"
            >
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {object}
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
          {data.room.participant?.map(function (object: any) {
            let estimation;
            if (data.show) {
              estimation = <Table.Cell>{object.estimation}</Table.Cell>;
            } else {
              if (object.estimation !== "X") {
                // Estimated
                estimation = (
                  <Table.Cell>
                    <svg
                      className="h-6 w-6 fill-green-600 text-gray-800 dark:text-white"
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
                  <svg
                    className="h-6 w-6 fill-primary-600 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                  </svg>
                );
              }
            }
            return (
              <Table.Row>
                <Table.Cell>{object.name}</Table.Cell>
                {estimation}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
