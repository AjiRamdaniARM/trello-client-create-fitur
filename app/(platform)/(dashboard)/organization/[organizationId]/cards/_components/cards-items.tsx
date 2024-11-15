"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ListWithCards } from "@/types";
import { ElementRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CardItem } from "@/app/(platform)/(dashboard)/board/[boardId]/_components/card-item";
import { CardsHeader } from "./cards-header";
import { CardForms } from "./cards-forms";




interface ListItemProps {
    data: ListWithCards;
    index: number;
  }

export const CardItems = ({
    data,
    index,
}: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  
  const [isEditing, setIsEditing] = useState(false);

  const disabledEditing = () => {
    setIsEditing(false);
  };

  const enabledEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  
    return (
      <Draggable  draggableId={data.id} index={index}>
        {(provided) => (
        <li 
        {...provided.draggableProps}
        ref={provided.innerRef}
        className="shrink-0 h-full w-[272px] select-none">
          <div 
          {...provided.dragHandleProps}
          className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
          <CardsHeader 
           onAddCard={enabledEditing} 
           data={data}
           />
             <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.cards.map((card, index) => (
                    <CardItem index={index} key={card.id} data={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
           <CardForms
             listId={data.id}
             ref={textareaRef}
             isEditing={isEditing}
             enabledEditing={enabledEditing}
             disabledEditing={disabledEditing}
             /> 
          </div>
        </li>
         )}
          </Draggable>
    );
};