"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { createRoom } from "./CreateRoom";

export default function NameModal() {
  const [openModal, setOpenModal] = useState(false);
  let localstorageName: string | null = null;
  if (typeof window !== "undefined") {
  localstorageName = window.localStorage.getItem("name");
  }

  const [name, setName] = useState(
    localstorageName === null ? "" : localstorageName,
  );

  function onCloseModal() {
    setOpenModal(false);
  }

  function submit(e: any) {
    window.localStorage.setItem("name", name);
    console.log(name);
    e.preventDefault();
    createRoom();
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Create Instant Room</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Choose your name
          </h3>
          <div className="space-y-6">
            <form onSubmit={submit} className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </div>
              <Button type="submit" className="mb-8">
                Create Room
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
