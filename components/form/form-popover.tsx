"use client";

import { X } from "lucide-react";
import { 
   Popover,
   PopoverClose,
   PopoverContent,
   PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { createBoard } from "@/actions/create-board";
import { ElementRef, useRef } from "react";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { FormPicker } from "./form-picker";

import { useAction } from "@/hooks/use-action"; 
import { toast } from "sonner";
import { useRouter } from "next/navigation";



interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = "bottom",
    align,
    sideOffset = 0,
}: FormPopoverProps) => {
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);



    const { execute, FieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
          toast.success("Board created!");
          closeRef.current?.click();
          router.push(`/board/${data.id}`);
        },
        onError: (error) => {       
             toast.error(error);
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;

        console.log({image});

       execute ({ title, image  });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-green-600 pb-4">
                    Create Board
                </div>
                <PopoverClose ref={closeRef}
                asChild>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-rose-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker
                         id="image"
                         errors={FieldErrors}
                        />
                        <FormInput
                            id="title"
                            label="Board Title"
                            type="text"
                            errors={FieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
