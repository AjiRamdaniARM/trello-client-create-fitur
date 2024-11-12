import { auth } from "@clerk/nextjs/server";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import CardList from "./_components/cards-list";
import { redirect } from "next/navigation";
import { CardsContainer } from "./_components/cards-container";

import { db } from "@/lib/db";

interface BoardIdPageProps {
    params: {
      boardId: string;
    };
  }

const CardPages = async ({ 
  params 
}: BoardIdPageProps) => {

    const { orgId } = auth();

    if (!orgId) {
      redirect("/select-org");
    }

    const lists = await db.list.findMany ({
      where: {
        boardId: params.boardId,
        board: {
        orgId,
        },
      },
      include:{
        cards:{
          orderBy:{
            order: "asc",
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    }) ;

    if (lists.length === 0) {
      return <div>there is no card board list</div>;
    }
  
    return (
      <div className="p-4 h-full overflow-x-auto">
         <Info/>
         <Separator className="my-2"/>
        <div className="relative mt-5">
          
        <CardsContainer boardId={params.boardId} data={lists} />
        </div>
      </div>
    );
  };
export default CardPages;