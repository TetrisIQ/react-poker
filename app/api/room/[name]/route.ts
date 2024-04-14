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

// estimate
// api/room/abc?alex=3
export async function PUT(
  request: Request,
  { params }: { params: { name: string } },
) {
  const urlParams = new URLSearchParams(request.url);
  const user = urlParams.get("user");
  const newEstimation: string | null = urlParams.get("estimation");
  if (user == null && newEstimation == null) {
    return NextResponse.json(
      { message: "You must provide a user and estimation as parameters" },
      { status: 400 },
    );
  }
  console.log(`${user} has made a new Estimation with ${newEstimation}: `);
  // get room from db
  const existingRoom = await prisma.room.findFirst({
    where: { name: params.name },
  });
  const participants: Array<Participant> = await prisma.participant.findMany({
    where: { roomId: existingRoom?.id },
  });
  let me: Participant | undefined = participants.find((p) => p.name === user);
  // new User
  if (me === undefined) {
    me = await prisma.participant.create({
      //@ts-ignore
      data: {
        name: user!,
        estimate: newEstimation!,
        roomId: existingRoom?.id,
      },
    });
    participants.push(me);
    return Response.json(participants);
  }
  // existing user
  me.estimate = newEstimation!;
  await prisma.participant.update({
    where: { id: me.id },
    data: me,
  });
  return Response.json(participants);
}
