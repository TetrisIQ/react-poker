import prisma from ".";

export function createRoomInDb(
  name: string,
  cards: string[] = ["1", "2", "3", "5", "8", "13"],
) {
  const data = prisma.room.create({
    data: {
      name,
      cards,
      show: false,
    },
  });
  return data;
}
