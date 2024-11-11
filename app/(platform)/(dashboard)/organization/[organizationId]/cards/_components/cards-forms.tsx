"use client";

import { toast } from "sonner";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { useRef, ElementRef, KeyboardEventHandler, forwardRef } from "react";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { Button } from "@/components/ui/button";
import { Plus, X,Eye  } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
    listId: string;
    enabledEditing: () => void;
    disabledEditing: () => void;
    isEditing: boolean;
}

export const CardForms = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    enabledEditing,
    disabledEditing,
    isEditing,
}, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, FieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" created`);
            formRef.current?.reset();
          },
          onError: (error) => {
            toast.error(error);
          },
        });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          disabledEditing();
        }
      };

      useOnClickOutside(formRef, disabledEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
        e
      ) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          formRef.current?.requestSubmit();
        }
      };

      const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        const boardId = params.boardId as string;

        execute({title, listId, boardId})
      };

    if (isEditing) {
        return (
            <form
             ref={formRef}
             action={onSubmit}
             className="m-1 py-0.5 px-1 space-y-4"
            >
              <FormTextarea
               id="title"
               onKeyDown={onTextareakeyDown}
               ref={ref}
               placeholder="Enter a title for this card..."
               errors={FieldErrors}
              />
              <input hidden id="listId" name="listId" value={listId}  />
              <div className="flex items-center gap-x-1">
                  <FormSubmit>Add card</FormSubmit>
                  <Button onClick={disabledEditing} size="sm" variant="ghost"> 
                    <X className="h-5 w-5"/>
                  </Button>
              </div>
            </form>
        );
    };

    return (
        <div className="pt-2 px-2">
            <Button
               className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
               size="sm"
               variant="ghost"
            >
                <Eye className="h-4 w-4 mr-2"/>
                For View Card
            </Button>
        </div>
    )
});

CardForms.displayName = "CardForm"