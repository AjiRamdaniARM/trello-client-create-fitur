import { db } from "@/lib/db";
import { CardsContainer } from "./cards-container";


interface BoardListsProps {
  boardId: string;
}

const CardList  = async ({ boardId }: BoardListsProps) => {
  const lists = await db.list.findMany({
    where: {
      boardId,
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return <CardsContainer boardId={boardId} data={lists} />;
};

export default CardList;