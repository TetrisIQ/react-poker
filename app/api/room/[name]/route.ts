// export const dynamic = 'force-dynamic' // defaults to auto
import { createRoomInDb } from "@/lib/prisma/Room";
import { Participant, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { name: string } },
) {
  const room = await prisma.room.findFirst({
    where: { name: params.name },
    include: {
      participant: true,
    },
  });
  if (room === null) {
    return NextResponse.json(
      {
        message: "Data not found",
      },
      {
        status: 400,
      },
    );
  }
  return Response.json({
    room,
  });
}

//Create Room
export async function POST(
  request: Request,
  { params }: { params: { name: string } },
) {
  return await createRoomInDb(params.name)
    .then((res) => {
      return Response.json({
        room: res,
      });
    })
    .catch((err) => {
      return Response.json({
        message:
          "Cannot create a room. Maybe the name already exists. Try to create an instant room or choose a diffrent name",
        error: err,
      });
    });
}

// Show room
export async function PUT(
  request: Request,
  { params }: { params: { name: string } },
) {
  // get room from db
  const existingRoom = await prisma.room.findFirst({
    where: { name: params.name },
  });
  // toggle show state
  const roomUpdate = await prisma.room.update({
    where: { id: existingRoom?.id },
    data: { show: !Boolean(existingRoom?.show) },
  });

  return Response.json(roomUpdate);
}
