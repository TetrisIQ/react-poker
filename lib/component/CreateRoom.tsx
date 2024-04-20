"use client";

import { Button } from "flowbite-react";
import { generateUsername } from "unique-username-generator";

export async function createRoom() {
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

export default function CreateRoom() {
  return (
    <Button onClick={createRoom} className="mb-8">
      Create Room
    </Button>
  );
}
