import { auth } from "@clerk/nextjs/server";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import CardList from "./_components/cards-list";
import { redirect } from "next/navigation";

interface BoardIdPageProps {
    params: {
      boardId: string;
    };
  }

const CardPages = async ({ params }: BoardIdPageProps) => {
    const { orgId } = auth();

    if (!orgId) {
      redirect("/select-org");
    }
  
    return (
      <div className="p-4 h-full overflow-x-auto">
         <Info/>
         <Separator className="my-2"/>
        <div className="relative mt-5">
        <CardList boardId={params.boardId} />
        </div>
      </div>
    );
  };
export default CardPages;