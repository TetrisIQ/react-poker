"use client";

import { Button } from "flowbite-react";
import { generateUsername } from "unique-username-generator";

async function createInstantRoom() {
  const roomName =
    generateUsername("-") + "-" + Math.floor(Math.random() * 999);
  await fetch(`api/room/${roomName}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      window.open(`/room/${roomName}`, "_self");
    })
    .catch((err) => console.error(err));
}

export default function CreateInstantRoom() {
  return (
    <Button onClick={createInstantRoom} className="mb-8">
      Create Instant Room
    </Button>
  );
}
