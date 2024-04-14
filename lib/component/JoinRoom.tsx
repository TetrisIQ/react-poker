"use client";
import { useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { createRoomInDb } from "../prisma/Room";

export default function CreateRoom() {
  const [value, setValue] = useState("");
  const handleChange = (e: any) => setValue(e.target.value);

  function handleClick() {
    window.open(`/room/${value}`, "_self");
  }
  return (
    <div className="inline-flex">
      <TextInput
        id="small-input"
        placeholder="Room name"
        value={value}
        onChange={handleChange}
      />
      <Button onClick={handleClick} className="ml-2">
        Enter
      </Button>
    </div>
  );
}
