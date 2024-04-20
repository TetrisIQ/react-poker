import winston from "winston";
// export const dynamic = 'force-dynamic' // defaults to auto
import { Participant, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

export async function PUT(
  request: NextApiRequest,
  { params }: { params: { name: string; user: string } },
) {
  const estimation = new URLSearchParams(request.url).get("estimation");
  if (!estimation) {
    return NextResponse.json(
      { message: "You must provide a user and estimation as parameters" },
      { status: 400 },
    );
  }
  logger.info(
    `${params.user} has made a new Estimation with ${estimation}: URL: ${request.url}`,
  );

  const existingRoom = await prisma.room.findFirst({
    where: { name: params.name },
  });
  const participants: Array<Participant> = await prisma.participant.findMany({
    where: { roomId: existingRoom?.id },
  });
  let me: Participant | undefined = participants.find(
    (p) => p.name === params.user,
  );

  if (me === undefined) {
    me = await prisma.participant.create({
      //@ts-ignore
      data: {
        name: params.user,
        estimate: String(estimation!),
        roomId: existingRoom?.id,
      },
    });
    participants.push(me);
    return NextResponse.json(participants);
  }

  me.estimate = String(estimation!);
  await prisma.participant.update({
    where: { id: me.id },
    data: me,
  });
  return NextResponse.json(participants);
}

export async function DELETE(
  request: Request,
  { params }: { params: { name: string } },
) {
  try {
    const existingRoom = await prisma.room.findFirst({
      where: { name: params.name },
    });

    if (existingRoom !== null) {
      const participants: Array<Participant> =
        await prisma.participant.findMany({
          where: { roomId: existingRoom?.id },
        });
      participants.forEach(async (p) => {
        await prisma.participant.update({
          where: { id: p.id },
          data: { estimate: "X" },
        });
      });
    }

    await prisma.room.update({
      where: { id: existingRoom?.id },
      data: { show: false },
    });

    return NextResponse.json({ success: "true" });
  } catch (error) {
    console.error("An error occurred:", error);
    return new NextResponse("An error occurred. Please try again later.", {
      status: 500,
    });
  }
}
